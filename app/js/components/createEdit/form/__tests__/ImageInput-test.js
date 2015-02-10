'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var React = require('react');
var TestUtils = React.addons.TestUtils;

function returnEmptyObj() {
    return {};
}

var inputMixinStub = Object.freeze({
    getInitialState: returnEmptyObj,
    getInputProps: returnEmptyObj,
    shouldComponentUpdate: () => true,
    showError: () => false,
    showWarning: () => false,
    getClasses: () => ''
});

var requireInputMixin = require('inject?./InputMixin.jsx!../ImageInput.jsx');

/* global describe, it */
describe('ImageInput', function() {
    it('has an initial state', function() {
        var ImageInput = requireInputMixin({
            './InputMixin.jsx': Object.assign({}, inputMixinStub, {
                getInitialState: function() {
                    //a fake sample state that should be included in ImageInput's initial state
                    return {inputMixinState: true};
                }
            })
        });

        var input = TestUtils.renderIntoDocument(
            <ImageInput />
        );

        expect(input.getInitialState()).to.eql({
            changedSinceUpdate: false,
            inputMixinState: true
        });
    });

    it('always renders a label, description, and input', function() {
        var id = 'id',
            label = 'label',
            description = 'test component test',
            value = '/path/to/file',
            optional = true,
            imageUri = 'https://localhost:8443/image',
            help = 'help help help',
            classes = 'css classes and stuff';

        var ImageInput = requireInputMixin({
            './InputMixin.jsx': Object.assign({}, inputMixinStub, {
                getInputProps: function() {
                    return {value: value, id: id, ref: 'input'};
                },
                getClasses: function() {
                    return classes;
                }
            })
        });

        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput id={id} label={label} imageUri={imageUri} description={description}
                help={help} optional={optional} />
        );

        var input = imageInput.refs.input.getDOMNode(),
            img = imageInput.refs.image.getDOMNode(),
            div = input.parentNode,
            labelEl = div.querySelector('label'),
            descriptionEl = div.querySelector('label + p'),
            helpEl = div.querySelector('.help-block');

        //value should not get set
        expect(input.value).to.not.be.ok();
        expect(input.id).to.equal(id);
        expect(input.type).to.equal('file');

        expect(img.src).to.equal(imageUri);

        expect(img.parentNode.classList.contains('image-container')).to.be.true();
        expect(img.parentNode.classList.contains('image-present')).to.be.true();

        expect(div.classList.contains('stuff')).to.be.true();

        expect(labelEl.htmlFor).to.equal(id);
        expect(labelEl.classList.contains('input-optional')).to.be.true();
        expect(labelEl.innerText).to.equal(label);

        expect(descriptionEl.innerText).to.equal(description);

        expect(helpEl.innerText).to.equal(help);
    });

    it('doesnt show the image container if there is no image', function() {
        var ImageInput = requireInputMixin({
            './InputMixin.jsx': inputMixinStub
        });

        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput />
        );

        var img = imageInput.refs.image.getDOMNode();

        expect(img.parentNode.classList.contains('image-container')).to.be.true();
        expect(img.parentNode.classList.contains('image-present')).to.be.false();
    });

    it('passes the file to its setter when onChange is called', function() {
        var ImageInput = requireInputMixin({
                './InputMixin.jsx': inputMixinStub
            }),
            setter = sinon.stub(),
            evt = {
                preventDefault: sinon.stub(),
                target: {
                    files: ['new file']
                }
            };


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput setter={setter} />
        );

        imageInput.onChange(evt);

        expect(imageInput.state.changedSinceUpdate).to.be.true();
        expect(evt.preventDefault.calledOnce).to.be.true();
        expect(setter.calledOnce).to.be.true();
        expect(setter.calledWith('new file')).to.be.true();

        //test alternate path for when the File API isn't supported
        evt.target.files = undefined;

        imageInput.state.changedSinceUpdate = false;
        imageInput.onChange(evt);

        expect(imageInput.state.changedSinceUpdate).to.be.true();
        expect(evt.preventDefault.calledTwice).to.be.true();
        expect(setter.calledTwice).to.be.true();
        expect(setter.calledWith(evt.target)).to.be.true();
    });

    it('sets to null when the file is removed', function() {
        var ImageInput = requireInputMixin({
                './InputMixin.jsx': inputMixinStub
            }),
            setter = sinon.stub(),
            evt = {
                preventDefault: sinon.stub(),
                target: {
                    files: ['new file']
                }
            };


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput setter={setter} />
        );

        imageInput.removeImage(evt);

        expect(imageInput.state.changedSinceUpdate).to.be.true();
        expect(evt.preventDefault.calledOnce).to.be.true();
        expect(setter.calledOnce).to.be.true();
        expect(setter.calledWith(null)).to.be.true();
    });

    it('fixes up the DOM after update', function() {
        var ImageInput = requireInputMixin({
                './InputMixin.jsx': inputMixinStub
            });


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput imageUri="asdf.png"/>
        );

        imageInput.setProps({imageUri: null});

        expect(imageInput.refs.image.getDOMNode().getAttribute('src')).to.equal(null);

        //can't really test the input value cleanup since it is impossible to give the input
        //a non '' value in Javascript
    });

    it('sets changedSinceUpdate to false when receiving new ' +
            'props with a serverError or no value', function() {
        var ImageInput = requireInputMixin({
                './InputMixin.jsx': inputMixinStub
            });


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput />
        );

        imageInput.setState({changedSinceUpdate: true});
        imageInput.setProps({value: null});

        expect(imageInput.state.changedSinceUpdate).to.be.false();

        imageInput.setState({changedSinceUpdate: true});
        imageInput.setProps({value: '/path/to/stuff', serverError: 'invalid media type'});

        expect(imageInput.state.changedSinceUpdate).to.be.false();
    });

    it('should update when InputMixin says so, or imageUri or serverErro have changed',
            function() {
        var mixinUpdateFlag = true,
            ImageInput = requireInputMixin({
                './InputMixin.jsx': Object.assign({}, inputMixinStub, {
                    shouldComponentUpdate: function() {
                        return mixinUpdateFlag;
                    }
                })
            });


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput />
        );

        expect(
            imageInput.shouldComponentUpdate({serverError: undefined, imageUri: undefined}))
            .to.be.true();
        expect(
            imageInput.shouldComponentUpdate({serverError: undefined, imageUri: 'https:///'}))
            .to.be.true();
        expect(
            imageInput.shouldComponentUpdate({serverError: 'Error!', imageUri: undefined}))
            .to.be.true();

        mixinUpdateFlag = false;

        expect(
            imageInput.shouldComponentUpdate({serverError: undefined, imageUri: undefined}))
            .to.be.false();
        expect(
            imageInput.shouldComponentUpdate({serverError: undefined, imageUri: 'https:///'}))
            .to.be.true();
        expect(
            imageInput.shouldComponentUpdate({serverError: 'Error!', imageUri: undefined}))
            .to.be.true();
    });

    it('shows warnings if the InputMixing says so and changedSinceUpdate is false', function() {
        var mixinWarningFlag = true,
            ImageInput = requireInputMixin({
                './InputMixin.jsx': Object.assign({}, inputMixinStub, {
                    showWarning: function() {
                        return mixinWarningFlag;
                    }
                })
            });


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput />
        );

        expect(imageInput.showWarning({}, {changedSinceUpdate: false})).to.be.true();
        expect(imageInput.showWarning({}, {changedSinceUpdate: true})).to.be.false();

        mixinWarningFlag = false;

        expect(imageInput.showWarning({}, {changedSinceUpdate: false})).to.be.false();
        expect(imageInput.showWarning({}, {changedSinceUpdate: true})).to.be.false();
    });

    it('shows warnings if the InputMixing says so, or there is a server error, ' +
           'and changedSinceUpdate is false', function() {
        var mixinErrorFlag = true,
            ImageInput = requireInputMixin({
                './InputMixin.jsx': Object.assign({}, inputMixinStub, {
                    showError: function() {
                        return mixinErrorFlag;
                    }
                })
            });


        var imageInput = TestUtils.renderIntoDocument(
            <ImageInput />
        );

        expect(imageInput.showError({}, {changedSinceUpdate: false})).to.be.ok();
        expect(imageInput.showError({}, {changedSinceUpdate: true})).to.be.false();
        expect(
            imageInput.showError({serverError: 'error'}, {changedSinceUpdate: false})
        ).to.be.ok();
        expect(
            imageInput.showError({serverError: 'error'}, {changedSinceUpdate: true})
        ).to.be.false();

        mixinErrorFlag = false;

        expect(imageInput.showError({}, {changedSinceUpdate: false})).to.be.false();
        expect(imageInput.showError({}, {changedSinceUpdate: true})).to.be.false();
        expect(
            imageInput.showError({serverError: 'error'}, {changedSinceUpdate: false})
        ).to.be.ok();
        expect(
            imageInput.showError({serverError: 'error'}, {changedSinceUpdate: true})
        ).to.be.false();
    });
});
