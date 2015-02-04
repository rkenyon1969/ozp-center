'use strict';

var React = require('react');
var Reflux = require('reflux');
var Modal = require('ozp-react-commons/components/Modal');
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
                <button className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button className="btn btn-danger" onClick={onDelete}>Delete</button>
            </Modal>
        );
        /* jshint ignore:end */
    },

    close: function () {
        this.refs.modal.close();
    }
});

var ListingDeleteConfirmation = React.createClass({

    propTypes: {
        /**
         * Listing ID
         */
        listing: React.PropTypes.string.isRequired
    },

    mixins: [ Reflux.ListenerMixin, Navigation, AjaxMixin ],

    getInitialState: function () {
        this.listenTo(GlobalListingStore, this.onStoreChange);
        return this.getState();
    },

    getState: function () {
        return {
            listing: GlobalListingStore.getById(this.props.listing)
        };
    },

    onStoreChange: function () {
        this.setState(this.getState());
    },

    render: function () {
        var listing = this.getListing();
        if (!listing) {
            return null;
        }
        var title = listing.title;

        /* jshint ignore:start */
        return (
            <DeleteConfirmation ref="modal" kind="listing" title={title}
                errorMessage={this.state.errorMessage}
                onHidden={this.onHidden} onDelete={this.onDelete}/>
        );
        /* jshint ignore:end */
    },

    getListing: function () {
        return this.state.listing;
    },

    close: function () {
        this.refs.modal.close();
    },

    onHidden: function () {
        this.goBack();
    },

    onDelete: function () {
        var listing = this.getListing();

        ListingApi.del(listing.id)
            .done(() => this.close())
            .fail(this.handleError);
    }
});

module.exports = {
    DeleteConfirmation: DeleteConfirmation,
    ListingDeleteConfirmation: ListingDeleteConfirmation
};
