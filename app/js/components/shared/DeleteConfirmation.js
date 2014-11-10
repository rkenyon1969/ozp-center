'use strict';

var React = require('react');
var Modal = require('./Modal');
var Router = require('react-router');
var Navigation = Router.Navigation;
var AjaxMixin = require('../../mixins/AjaxMixin');

var ListingApi = require('../../webapi/Listing').ListingApi;
var GlobalListingStore = require('../../stores/GlobalListingStore');
var _ = require('../../utils/_');

var DeleteConfirmation = React.createClass({

    propTypes: {
        errorMessage: React.PropTypes.string,
        onHidden: React.PropTypes.func,
        onDelete: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            onHidden: _.noop
        };
    },

    getInitialState: function () {
        return {};
    },

    render: function () {
        var kind = this.props.kind,
            title = this.props.title,
            onDelete = this.props.onDelete,
            errorMessage = this.props.errorMessage;

        /* jshint ignore:start */
        return (
            <Modal ref="modal" className="DeleteConfirmation" size="small" onHidden={this.props.onHidden}>
                <button className="close corner" data-dismiss="modal">×</button>
                {
                    errorMessage && <div className="alert alert-danger">{errorMessage}</div>
                }
                <strong>
                    Are you sure that you would like to delete the {kind} &quot;{title}&quot;?
                </strong>
                <button className="btn btn-default cancel" data-dismiss="modal">Cancel</button>
                <button className="btn btn-warning delete" onClick={onDelete}>Delete</button>
            </Modal>
        );
        /* jshint ignore:end */
    },

    close: function () {
        this.refs.modal.close();
    }
});

var ListingDeleteConfirmation = React.createClass({

    mixins: [Navigation, AjaxMixin],

    render: function () {
        var listing = this.getListing(),
            title = listing.title();

        /* jshint ignore:start */
        return (
            <DeleteConfirmation ref="modal" kind="listing" title={title}
                errorMessage={this.state.errorMessage}
                onHidden={this.onHidden} onDelete={this.onDelete}/>
        );
        /* jshint ignore:end */
    },

    getListing: function () {
        return GlobalListingStore.getById(this.props.params.listingId);
    },

    close: function () {
        this.refs.modal.close();
    },

    onHidden: function () {
        this.goBack();
    },

    onDelete: function () {
        var listing = this.getListing();

        ListingApi.del(listing.id())
            .done(() => this.close())
            .fail(this.handleError);
    }
});

module.exports = {
    DeleteConfirmation: DeleteConfirmation,
    ListingDeleteConfirmation: ListingDeleteConfirmation
};
