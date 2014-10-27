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
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        Schema: React.PropTypes.func.isRequired,
        form: React.PropTypes.shape({
            fields: React.PropTypes.object.isRequired,
        }),
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
            <Modal ref="modal" className={className} title={title} onHidden={this.resetState}>
                <form>
                    <Form ref="form"/>
                </form>
                <div className="modal-footer">
                    <button role="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button role="button" className="btn btn-success" onClick={onSave}>Save</button>
                </div>
            </Modal>
        );
        /* jshint ignore:end */
    },

    renderCreateForm: function () {
        var formOptions = _.assign({}, this.props.form, {
            auto: 'labels'
        });
        return this._renderCreateEditForm(`Create ${this.props.title}`, `Create${this.props.title}`, formOptions, this.onCreate);
    },

    renderEditForm: function () {
        var formOptions = _.assign({}, this.props.form, {
            value: this.getSelectedRecord(),
            auto: 'labels'
        });
        return this._renderCreateEditForm(`Edit ${this.props.title}`, `Edit${this.props.title}`, formOptions, this.onEdit);
    },

    renderDeleteConfirmation: function () {
        var kind = this.props.title.toLowerCase();
        var title = this.getSelectedRecord().title;
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

    onCreate: function () {
        var formData = this.refs.form.getValue();
        if (!formData) { return; }

        $.ajax({
            url: this.props.url,
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
            url: `${this.props.url}/${id}`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        }).then(() => this.reload());
    },

    onDelete: function () {
        var id = this.getSelectedId();
        $.ajax({
            url: `${this.props.url}/${id}`,
            type: 'delete'
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
        var options = _.assign({}, this.props.grid, {
            recid: 'id',
            name: uuid(),
            fixedBody: false,
            show: {
                toolbar: true,
                toolbarAdd: true,
                toolbarEdit: true,
                toolbarDelete: true,
                toolbarSearch: false
            },
            url : this.props.url,
            onLoad: (event) => {
                var data = JSON.parse(event.xhr.responseText);
                this.records = data._embedded.item;
                event.xhr.responseText = {
                    total: data._embedded.item.length,
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
        });

        this.grid = $(this.refs.grid.getDOMNode()).w2grid(options);
    },

    componentWillUnmount: function () {
        this.grid.destroy();
    }

});

module.exports = Crud;
