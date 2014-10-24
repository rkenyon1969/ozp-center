'use strict';

var React = require('react');
var Modal = require('./Modal');
var Router = require('react-router');
var Navigation = Router.Navigation;

var ListingApi = require('../../webapi/Listing').ListingApi;
var GlobalListingStore = require('../../stores/GlobalListingStore');

var DeleteConfirmation = React.createClass({
    mixins: [Navigation],

    getInitialState: function() {
        return {};
    },

    render: function() {
        var kind = this.props.kind,
            title = this.props.title,
            del = this.props.deleteHandler;

        /* jshint ignore:start */
        return (
            <Modal ref="modal" className="DeleteConfirmation" size="small">
                <button className="close corner" onClick={this.close}>×</button>
                {
                    this.state.error &&
                        <div className="alert alert-danger">{this.state.error}</div>
                }
                <strong>
                    Are you sure that you would like to delete the {kind} &quot;{title}&quot;?
                </strong>
                <button className="btn btn-default cancel" onClick={this.close}>Cancel</button>
                <button className="btn btn-warning delete" onClick={del}>Delete</button>
            </Modal>
        );
        /* jshint ignore:end */
    },

    close: function() {
        this.refs.modal.close();
        this.goBack();
    },

    setError: function(errorMsg) {
        this.setState({
            error: errorMsg
        });
    }
});

var ListingDeleteConfirmation = React.createClass({
    render: function() {
        var listing = this.getListing(),
            title = listing.title();

        /* jshint ignore:start */
        return (
            <DeleteConfirmation ref="confirmation" kind="listing" title={title}
                deleteHandler={this.onDelete}/>
        );
        /* jshint ignore:end */
    },

    getListing: function() {
        return GlobalListingStore.getById(this.props.params.listingId);
    },

    onDelete: function() {
        var me = this,
            listing = this.getListing();

        ListingApi.del(listing.id())
            .then(function() {
                me.refs.confirmation.close();
            }, function(response) {
                var message = response.responseJSON ?
                    (response.responseJSON.message || response.responseText) :
                    response.responseText;

                me.refs.confirmation.setError(message);
            });
    }
});

module.exports = {
    DeleteConfirmation: DeleteConfirmation,
    ListingDeleteConfirmation: ListingDeleteConfirmation
};
