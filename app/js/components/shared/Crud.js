'use strict';

require('script!w2ui');
w2utils.settings.dataType = 'RESTFULL';

var React = require('react');
var $ = require('jquery');
var t = require('tcomb-form');
var Modal = require('./Modal');
var _ = require('../../utils/_');
var uuid = require('../../utils/uuid');
var { DeleteConfirmation } = require('../shared/DeleteConfirmation');
var { FOCUSABLE_ELEMENTS } = require('../../constants');
var AjaxMixin = require('../../mixins/AjaxMixin');

var CreateEditModal = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" confirm="Save" cancel="Cancel" size="small" title={this.props.title}
                onShown={ this.onShown }>
                { this.props.children }
            </Modal>
        );
        /* jshint ignore:end */
    },

    onShown: function () {
        var el = $(this.getDOMNode()).find(FOCUSABLE_ELEMENTS).not(':disabled').get(0);
        if (el) {
            var $el = $(el).focus();

            // move cursor to end of input/textarea
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                $el.val($el.val());
            }
        }
    },

    close: function () {
        this.refs.modal.close();
    }

});

var Crud = React.createClass({

    mixins: [ AjaxMixin ],

    propTypes: {
        /**
        *
        * Title of the domain that is being managed.
        * Used to auto generate modal header title and delete warnings.
        *
        **/
        title: React.PropTypes.string.isRequired,

        /**
        *
        * Should return display name usually title of the record.
        * Used to auto generate delete warning message.
        *
        **/
        getDisplayName: React.PropTypes.func.isRequired,

        /**
        *
        * RESTful URL for domain.
        *
        **/
        url: React.PropTypes.string.isRequired,

        /**
        *
        * tcomb domain schema.
        * See: https://github.com/gcanti/tcomb#quick-examples
        *
        **/
        Schema: React.PropTypes.func.isRequired,

        /**
        *
        * Can be either a function or object.
        * Function is passed selectedRecord in case of edit, and is expected to teturn tcomb-form options. Useful for modifiy input attributes dynamically.
        *
        **/
        form: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.shape({
                fields: React.PropTypes.object.isRequired,
            })
        ]).isRequired,

        /**
        *
        * w2ui grid options.
        * See: http://w2ui.com/web/docs/grid
        *
        **/
        grid: React.PropTypes.shape({
            columns: React.PropTypes.array.isRequired
        })
    },

    getInitialState: function () {
        return {
            adding: false,
            editing: false,
            deleting: false,
            records: []
        };
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <section ref="grid"></section>
                { this.state.adding && this.renderCreateForm() }
                { this.state.editing && this.renderEditForm() }
                { this.state.deleting && this.renderDeleteConfirmation() }
            </div>
        );
        /* jshint ignore:end */
    },

    _renderCreateEditForm: function (title, formOptions, onSave) {
        var options = _.cloneDeep(formOptions);
        var { fields } = options;

        if(this.state.errors) {
            Object.keys(this.state.errors).forEach((key) => {
                fields[key] = _.assign((fields[key] || {}), {
                    message: this.state.errors[key],
                    hasError: true
                });
            });
        }
        var Form = t.form.createForm(this.props.Schema, options);

        /* jshint ignore:start */
        return (
            <CreateEditModal ref="modal" title={title} onHidden={this.resetState} onConfirm={onSave}>
                <form>
                    <Form ref="form"/>
                </form>
            </CreateEditModal>
        );
        /* jshint ignore:end */
    },

    renderCreateForm: function () {
        var title = `Create ${this.props.title}`;
        var formOptions = _.assign({
                auto: 'labels',
                value: this.refs.form && this.refs.form.getValue()
            },
            _.isFunction(this.props.form) ? this.props.form() : this.props.form
        );

        return this._renderCreateEditForm(title, formOptions, this.onCreate);
    },

    renderEditForm: function () {
        var title = `Edit ${this.props.title}`;
        var value = (this.refs.form && this.refs.form.getValue()) || this.getSelectedRecord();
        var formOptions = _.assign({
                auto: 'labels',
                value: value
            },
            _.isFunction(this.props.form) ? this.props.form(value) : this.props.form
        );

        return this._renderCreateEditForm(title, formOptions, this.onEdit);
    },

    renderDeleteConfirmation: function () {
        var kind = this.props.title.toLowerCase();
        var title = this.props.getDisplayName(this.getSelectedRecord());

        /* jshint ignore:start */
        return (
            <DeleteConfirmation ref="modal" kind={ kind } title={ title }
                errorMessage={this.state.errorMessage}
                onHidden={this.resetState} onDelete={this.onDelete} />
        );
        /* jshint ignore:end */
    },

    getSelectedId: function () {
        return this.grid.getSelection()[0];
    },

    getSelectedRecord: function () {
        return _.find(this.records, { id: this.getSelectedId() });
    },

    getUrlWithoutParams: function () {
        return this.props.url.replace(/\?.*/, '');
    },

    onCreate: function () {
        var formData = this.refs.form.getValue();
        if (!formData) { return; }

        $.ajax({
            url: this.getUrlWithoutParams(),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        })
        .done(this.reload)
        .fail(this.handleError);
    },

    onEdit: function () {
        var id = this.getSelectedId();
        var formData = this.refs.form.getValue();
        if (!formData) { return; }

        $.ajax({
            url: `${this.getUrlWithoutParams()}/${id}`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        })
        .done(this.reload)
        .fail(this.handleError);
    },

    onDelete: function () {
        var id = this.getSelectedId();
        $.ajax({
            url: `${this.getUrlWithoutParams()}/${id}`,
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(this.reload)
        .fail(this.handleError);
    },

    reload: function () {
        this.grid.reload();
        this.refs.modal.close();
    },

    resetState: function () {
        this.setState(this.getInitialState());
    },

    componentDidMount: function () {
        var options = _.assign({
            recid: 'id',
            name: uuid(),
            fixedBody: false,
            multiSelect : false,
            show: {
                toolbar: true,
                toolbarAdd: true,
                toolbarEdit: true,
                toolbarDelete: true,
                toolbarSearch: false,
                toolbarReload: false,
                toolbarColumns: false
            },
            url : this.props.url,
            onLoad: (event) => {
                var data = JSON.parse(event.xhr.responseText);
                this.records = data.total > 0 ? [].concat(data._embedded.item) : [];
                event.xhr.responseText = {
                    total: this.records.length,
                    records: this.records
                };
            },
            onAdd: (event) => {
                event.preventDefault();
                this.setState({ adding: true, editing: false, deleting: false });
            },
            onEdit: (event) => {
                event.preventDefault();
                this.setState({ adding: false, editing: true, deleting: false });
            },
            onDelete: (event) => {
                event.preventDefault();
                this.setState({ adding: false, editing: false, deleting: true });
            }
        }, this.props.grid);

        this.grid = $(this.refs.grid.getDOMNode()).w2grid(options);
    },

    componentWillUnmount: function () {
        this.grid.destroy();
    }

});

module.exports = Crud;
