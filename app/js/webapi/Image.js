'use strict';

var ImageApi = {
    save: function(file) {
        if (!(file instanceof Blob)) {
            throw new Error('Must provide Blob to save image');
        }
        else {
            return $.ajax({
                url: API_URL + '/api/image/',
                type: 'POST',
                data: file,
                processData: false,
                contentType: false,
                accepts: {
                    json: 'application/json'
                }
            }).then(resp => resp); //only capture first arg
        }
    }
};

module.exports.ImageApi = ImageApi;
