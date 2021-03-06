'use strict';

var $ = require('jquery');
var { API_URL } = require('ozp-react-commons/OzoneConfig');

var iframeCounter = 1;
var IMAGE_URL = API_URL + '/api/image/';

var TIMEOUT = 10000; //10 seconds
var UNKN0WN_ERROR_MESSAGE = 'Unknown error saving image';

/**
 * Read the response from the hidden iframe.  This function gets called in response
 * to the iframe load event
 */
function readIframeResponse(deferred, timeoutId, evt) {
    var iframe = evt.target,
        responseText,
        responseJson;

    clearTimeout(timeoutId);

    try {
        responseText = iframe.contentWindow.document.body.innerText;
        responseJson = JSON.parse(responseText);

        if (responseJson.error) {
            var errorMessage = responseJson.message || UNKN0WN_ERROR_MESSAGE;
            deferred.reject({message: errorMessage}, 'error', errorMessage);
        }
        else {
            deferred.resolve(responseJson);
        }
    }
    catch (e) {
        var msg = 'Error reading image upload response';
        deferred.reject(msg);
    }
}

/**
 * Handle hidden-iframe errors that come from the error event (not sure this ever actually
 * gets called)
 */
function readIframeError(deferred, timeoutId) {
    clearTimeout(timeoutId);
    deferred.reject(UNKN0WN_ERROR_MESSAGE);
}

/**
 * Handle hidden-iframe error cases where our code does not receive any notification of the
 * error
 */
function formTimeout(deferred) {
    deferred.reject('Timeout saving image to server');
}

/**
 * Undo DOM changes that were made to facilitate a hidden-iframe based submission
 * @param containerEl The hidden containing div which contains the temporary form and iframe
 * @param placeholderInput The temporary file input that was put where the real input goes
 * in the UI.  It will be removed and replaced with the real input
 */
function cleanupDom(containerEl, placeholderInput) {
    var input = containerEl.querySelector('input'),
        iframe = containerEl.querySelector('iframe');

    //unhook handlers to avoid possible memory leaks
    iframe.onload = null;
    iframe.onerror = null;

    //remove hidden form and iframe
    containerEl.parentNode.removeChild(containerEl);

    //put the real input back in place, discarding the placeholder
    placeholderInput.parentNode.replaceChild(input, placeholderInput);
}

/**
 * API for uploading images to the server.  In modern browsers, this uses the File API and
 * XMLHttpRequest 2 in order to upload the file contents as the raw HTTP request contents.
 * In browsers that don't support that mechanism (IE9), creates a hidden <form> and <iframe> to
 * perform the submission as multipart/form-data.
 *
 * NOTE: The form-data upload only works if the API server is not cross domain.  If it is,
 * the upload will succeed but the response will be unreadable.  This is acceptable because
 * IE9 has other limitations (CORS) that prevent cross-domain REST anyway
 *
 * IE11 NOTE: For the new backend, we need to send some metadata with the image (e.g. access
 * control). To do that we append that metadata and the image to FormData and post FormData. But,
 * appending that does not work for IE11 on the first post when using basic authentation. With
 * basic auth, when things work as expected, there are two posts, a first unsuccessful one that
 * returns a 401 and a second successful one. The second one never happens in the IE11 + formData +
 * append + image case. The workaround is to explicitly make two posts to the image endpoint, the
 * first dummy post that the new backend tolerates (returns 200) and the second that posts the
 * image for real.
 */
var ImageApi = {
    save: function(file, marking) {
        //File API supported
        if (window.Blob && file instanceof Blob) {
            var form = new FormData();
            form.append("file_extension", file.type.split('/')[1]);
            form.append("security_marking", marking);
            form.append("image", file);

            // TODO: When size validation is ready, make this variable (new parameter)
            form.append("image_type", "large_screenshot");

            var postForReal = function() {
                return $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": IMAGE_URL,
                    "method": "POST",
                    "headers": {},
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }).then(resp => resp); //only capture first arg
            };

            return $.ajax({
                "url": IMAGE_URL,
                "method": "POST",
                data: JSON.stringify({ "cuz_ie": "Dummy empty first post for IE11" }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).then(() => postForReal());
        }
        //File API not supported, use form upload and iframe
        else if (file instanceof HTMLInputElement) {
            return this.saveViaFormData(file, marking);
        }
        else {
            throw new Error('Expected argument to be Blob or HTMLInputElement, but was '+file);
        }
    },

    saveViaFormData: function(input, marking) {
        //assume it is a file input element, use hidden iframe to submit
        var deferred = $.Deferred(),
            container = document.createElement('div'),
            iframe = document.createElement('iframe'),
            inputPlaceholder = input.cloneNode(),
            form = document.createElement('form'),
            frameName = 'image-upload-frame-' + (iframeCounter++),
            timeoutId,
            fileExtension = input.type.split('/')[1],
            accessControl = marking,
            imageType = "large_screenshot";

        //hide all these elements
        container.setAttribute('style', 'display:none;');

        //server expects form-data with the image as a part called 'image'
        input.name = 'image';

        fileExtension.name = 'file_extension';
        accessControl.name = 'security_marking';
        imageType.name = 'image_type';

        //the real input will be moved to the hidden form.  Place a copy in its place to avoid
        //visual disruption when it is moved
        input.parentNode.replaceChild(inputPlaceholder, input);

        iframe.name = frameName;
        container.appendChild(iframe);

        form.target = frameName;
        form.action = IMAGE_URL;
        form.method = 'post';
        form.enctype = 'multipart/form-data';
        form.appendChild(input);
        form.appendChild(fileExtension);
        form.appendChild(accessControl);
        form.appendChild(imageType);

        container.appendChild(form);

        document.body.appendChild(container);

        //function to tear down all these temp elements after the request completes
        deferred.always(cleanupDom.bind(null, container, inputPlaceholder));

        //handle various ways that the request can "complete"
        timeoutId = setTimeout(formTimeout.bind(null, deferred), TIMEOUT);
        iframe.onload = readIframeResponse.bind(null, deferred, timeoutId);
        iframe.onerror = readIframeError.bind(null, deferred, timeoutId);

        form.submit();

        //the deferred will be resolved/rejected by one of the three
        //callbacks established above
        return deferred.promise();
    }
};

module.exports.ImageApi = ImageApi;
