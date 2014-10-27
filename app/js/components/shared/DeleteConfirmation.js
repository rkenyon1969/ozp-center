'use strict';

var React = require('react');
var Modal = require('./Modal');
var Router = require('react-router');
var Navigation = Router.Navigation;

var ListingApi = require('../../webapi/Listing').ListingApi;
var GlobalListingStore = require('../../stores/GlobalListingStore');
var _ = require('../../utils/_');

var DeleteConfirmation = React.createClass({

    propTypes: {
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
            del = this.props.onDelete;

        /* jshint ignore:start */
        return (
            <Modal ref="modal" className="DeleteConfirmation" size="small" onHidden={this.props.onHidden}>
                <button className="close corner" data-dismiss="modal">×</button>
                {
                    this.state.error &&
                        <div className="alert alert-danger">{this.state.error}</div>
                }
                <strong>
                    Are you sure that you would like to delete the {kind} &quot;{title}&quot;?
                </strong>
                <button className="btn btn-default cancel" data-dismiss="modal">Cancel</button>
                <button className="btn btn-warning delete" onClick={del}>Delete</button>
            </Modal>
        );
        /* jshint ignore:end */
    },

    close: function () {
        this.refs.modal.close();
    },

    setError: function (errorMsg) {
        this.setState({
            error: errorMsg
        });
    }
});

var ListingDeleteConfirmation = React.createClass({

    mixins: [Navigation],

    render: function () {
        var listing = this.getListing(),
            title = listing.title();

        /* jshint ignore:start */
        return (
            <DeleteConfirmation ref="modal" kind="listing" title={title}
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
        var me = this,
            listing = this.getListing();

        ListingApi.del(listing.id())
            .then(function () {
                me.refs.modal.close();
            }, function (response) {
                var message = response.responseJSON ?
                    (response.responseJSON.message || response.responseText) :
                    response.responseText;

                me.refs.modal.setError(message);
            });
    }
});

module.exports = {
    DeleteConfirmation: DeleteConfirmation,
    ListingDeleteConfirmation: ListingDeleteConfirmation
};
