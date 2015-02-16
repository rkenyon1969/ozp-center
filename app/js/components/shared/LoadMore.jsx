'use strict';

var React = require('react');
var { PropTypes } = React;

var LoadMore = React.createClass({

    propTypes: {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        hasMore: PropTypes.bool.isRequired,
        onLoadMore: PropTypes.func.isRequired
    },

    render: function () {
        return this.transferPropsTo(
            <div className="LoadMore">
                { this.renderList() }
                { this.renderLoadMoreButton() }
            </div>
        );
    },

    renderList: function () {
        var { children } = this.props;

        if (children && children.length > 0) {
            return <ol className="list-unstyled">{ this.props.children }</ol>;
        }
        else {
            return <h2 style={{marginTop: 0}}>No results found!</h2>;
        }
    },

    renderLoadMoreButton: function () {
        if (this.props.hasMore) {
            return (
                <div className="text-center LoadMore__Toolbar">
                    <button className="btn btn-default LoadMore__Button" onClick={this.props.onLoadMore}>Load More</button>
                </div>
            );
        }
    }

});

module.exports = LoadMore;
