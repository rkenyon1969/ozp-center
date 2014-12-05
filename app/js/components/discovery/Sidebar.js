'use strict';

var React = require('react');
var _ = require('../../utils/_');

var Sidebar = React.createClass({

    propTypes: {
        isSearching: React.PropTypes.bool.isRequired,
        system: React.PropTypes.shape({
            categories: React.PropTypes.array.isRequired,
            types: React.PropTypes.array.isRequired,
            organizations: React.PropTypes.array.isRequired
        }).isRequired,
        onGoHome: React.PropTypes.func.isRequired,
        onFilterChange: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            selectedFilters: (this.state && this.state.selectedFilters) || {}
        };
    },

    render: function () {
        var me = this;
        var isBrowsing = this.props.isSearching || this.areFiltersApplied();

        var homeLinkClasses = React.addons.classSet({
            'active': !isBrowsing,
            'facet-group-item': true
        });

        /*jshint ignore:start */
        return (
            <aside className="sidebar">
                <ul className="list-unstyled facet-group">
                    <li className={ homeLinkClasses } onClick={ this.clearFilters }>Home</li>
                </ul>
                <ul className="list-unstyled facet-group">
                    <li>
                        <span>Categories</span>
                        <ul className="list-unstyled">
                            { this.renderFacets(this.props.system.categories, 'categories') }
                        </ul>
                    </li>
                    <li>
                        <span>Types</span>
                        <ul className="list-unstyled">
                            { this.renderFacets(this.props.system.types, 'type') }
                        </ul>
                    </li>
                    <li>
                        <span>Organizations</span>
                        <ul className="list-unstyled">
                            { this.renderFacets(this.props.system.organizations, 'agency') }
                        </ul>
                    </li>
                </ul>
            </aside>
        );
        /*jshint ignore:end */
    },

    renderFacets: function (list, key) {
        var me = this;

        return list.map(function (facetOption, index) {
            var classes = React.addons.classSet({
                active: _.contains(me.state.selectedFilters[key], facetOption.title),
                'facet-group-item': true
            });

            /*jshint ignore:start */
            return (
                <li className={ classes } onClick={ me.handleFilterToggle.bind(null, key, facetOption) }>{facetOption.title}</li>
            );
            /*jshint ignore:end */
        });
    },

    areFiltersApplied: function () {
        var areFiltersApplied = false;
        _.forOwn(this.state.selectedFilters, function (value, key) {
            areFiltersApplied = areFiltersApplied || value.length;
        });
        return areFiltersApplied;
    },

    clearFilters: function () {
        var selectedFilters = this.state.selectedFilters;

        // clear selected filter array
        _.forOwn(selectedFilters, function (value, key) {
            selectedFilters[key].length = 0;
        });

        this.setState({
            selectedFilters: selectedFilters
        });
        this.props.onGoHome();
    },

    handleFilterToggle: function (type, clickedFilter, e) {
        var values = this.state.selectedFilters[type] || (this.state.selectedFilters[type] = []);
        var value = clickedFilter.title;

        if (_.contains(values, value)) {
            this.state.selectedFilters[type] = _.without(values, value);
        }
        else {
            values.push(value);
        }

        this.setState({
            selectedFilters: this.state.selectedFilters
        });

        this.props.onFilterChange();
    }

});

module.exports = Sidebar;
