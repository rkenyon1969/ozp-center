'use strict';

// using raw-loader instead of css-loader as csso, module used by css-loader to
// inline imports has issues parsing css file
require('style-loader!raw-loader!../../../../node_modules/w2ui/dist/w2ui.min.css');
require('script!w2ui');
w2utils.settings.dataType = 'RESTFULL';

var React = require('react');
var $ = require('jquery');
var t = require('tcomb-form');
var Modal = require('ozp-react-commons/components/Modal.jsx');
var _ = require('../../utils/_');
var uuid = require('../../utils/uuid');
var { DeleteConfirmation } = require('../shared/DeleteConfirmation.jsx');
var { FOCUSABLE_ELEMENTS } = require('ozp-react-commons/constants');
var AjaxMixin = require('../../mixins/AjaxMixin');

var CreateEditModal = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        return this.transferPropsTo(
            <Modal ref="modal" confirm="Save" cancel="Cancel" size="small" title={this.props.title}
                onShown={ this.onShown }>
                { this.props.children }
            </Modal>
        );
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
            records: [],
            formState: null
        };
    },

    render: function () {
        return (
            <div>
                <section ref="grid"></section>
                { this.state.adding && this.renderCreateForm() }
                { this.state.editing && this.renderEditForm() }
                { this.state.deleting && this.renderDeleteConfirmation() }
            </div>
        );
    },

    onFormChange: function() {
        this.state.formState = this.refs.form.getValue();
    },

    _renderCreateEditForm: function (title, formOptions, onSave) {
        var me = this,
            options = _.cloneDeep(formOptions),
            fields = options.fields || (options.fields = {});

        if(this.state.errors) {
            Object.keys(this.state.errors).forEach((key) => {
                fields[key] = _.assign((fields[key] || {}), {
                    message: this.state.errors[key],
                    hasError: true
                });
            });
        }

        Object.keys(fields).forEach(function(key) {
            var value = fields[key];
            value.onChange = me.onFormChange;
        });

        var Form = t.form.createForm(this.props.Schema, options);

        return (
            <CreateEditModal ref="modal" title={title} onHidden={this.resetState} onConfirm={onSave}>
                <form>
                    <Form ref="form"/>
                </form>
            </CreateEditModal>
        );
    },

    renderCreateForm: function () {
        var title = `Create ${this.props.title}`;
        var formOptions = _.assign({
                auto: 'labels',
                value: this.state.formState
            },
            _.isFunction(this.props.form) ? this.props.form() : this.props.form
        );

        return this._renderCreateEditForm(title, formOptions, this.onCreate);
    },

    renderEditForm: function () {
        var title = `Edit ${this.props.title}`;
        var value = this.state.formState || this.getSelectedRecord();
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

        return (
            <DeleteConfirmation ref="modal" kind={ kind } title={ title }
                errorMessage={this.state.errorMessage}
                onHidden={this.resetState} onDelete={this.onDelete} />
        );
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

    //Retrieve form data process a create, using a potentially custom function
    onCreate: function () {
        //use the form data that we already have in state, if available
        var formData = this.refs.form.getValue(),
            createFn = this.props.onCreate || this._onCreate;

        if (formData) {
            return createFn(formData);
        }
    },

    //The default implementation of this.props.onCreate.  This function may also be called
    //by custom onCreate implementations
    _onCreate: function(data) {
        return $.ajax({
            url: this.getUrlWithoutParams(),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .done(this.reload)
        .fail(this.handleError);
    },

    onEdit: function () {
        var formData = this.refs.form.getValue(),
            editFn = this.props.onEdit || this._onEdit;

        if (formData) {
            return editFn(formData);
        }
    },

    //The default implementation of this.props.onEdit.  This function may also be called
    //by custom onEdit implementations
    _onEdit: function(data) {
        var id = this.getSelectedId();

        return $.ajax({
            url: `${this.getUrlWithoutParams()}/${id}`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data)
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

        if (this.props.onResetState) {
            this.props.onResetState();
        }
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
            buttons: {
                add: {
                    icon: 'icon-square-plus'
                },
                edit: {
                    icon: 'fa fa-pencil'
                },
                delete: {
                    icon: 'fa fa-trash-o'
                }
            },
            url : this.props.url,
            parser: (responseText) => {
                var data = JSON.parse(responseText);
                this.records = data.total > 0 ? [].concat(data._embedded.item) : [];
                return {
                    total: this.records.length,
                    records: this.records
                };
            },
            getCellValue: (...args) => {
                var value = w2obj.grid.prototype.getCellValue.apply(this.grid, args);
                return _.escape(value);
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
