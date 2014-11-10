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

var Crud = React.createClass({

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

    _renderCreateEditForm: function (title, className, formOptions, onSave) {
        var Form = t.form.createForm(this.props.Schema, formOptions);

        /* jshint ignore:start */
        return (
            <Modal ref="modal" confirm="Save" cancel="Cancel" size="small" className={className} title={title}
                onHidden={this.resetState}
                onConfirm={onSave}>
                <form>
                    <Form ref="form"/>
                </form>
            </Modal>
        );
        /* jshint ignore:end */
    },

    renderCreateForm: function () {
        var formOptions = _.assign({
                auto: 'labels'
            },
            _.isFunction(this.props.form) ? this.props.form() : this.props.form
        );

        return this._renderCreateEditForm(
            `Create ${this.props.title}`,
            `Create${this.props.title}`,
            formOptions,
            this.onCreate
        );
    },

    renderEditForm: function () {
        var value = this.getSelectedRecord();
        var formOptions = _.assign({
                auto: 'labels',
                value: value
            },
            _.isFunction(this.props.form) ? this.props.form(value) : this.props.form
        );

        return this._renderCreateEditForm(
            `Edit ${this.props.title}`,
            `Edit${this.props.title}`,
            formOptions,
            this.onEdit
        );
    },

    renderDeleteConfirmation: function () {
        var kind = this.props.title.toLowerCase();
        var title = this.props.getDisplayName(this.getSelectedRecord());
        /* jshint ignore:start */
        return (
            <DeleteConfirmation ref="modal" kind={ kind } title={ title }
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
        }).then(() => this.reload());
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
        }).then(() => this.reload());
    },

    onDelete: function () {
        var id = this.getSelectedId();
        $.ajax({
            url: `${this.getUrlWithoutParams()}/${id}`,
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json'
        }).then(() => this.reload());
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
