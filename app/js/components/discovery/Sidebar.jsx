'use strict';

var React = require('react');
var _ = require('../../utils/_');

var Sidebar = React.createClass({

    propTypes: {
        isSearching: React.PropTypes.bool.isRequired,
        categories: React.PropTypes.array.isRequired,
        onGoHome: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            categories: []
        };
    },

    componentWillMount: function(){
      if(this.props.initCategories){
        this.setState({categories: this.props.initCategories});
      }
    },

    onHomeClick() {
        this.state.categories.length = 0;
        this.forceUpdate();

        this.props.onGoHome();
    },

    onSelect(category) {
        var { categories } = this.state;
        var { title } = category;

        if (_.contains(categories, title)) {
            categories = _.without(categories, title);
        }
        else {
            categories = categories.concat(title);
        }

        var state = {
            categories: categories
        };

        this.setState(state);
        this.props.onChange(categories);
    },

    renderCategories() {
        var me = this;

        return this.props.categories.map(function (category) {
            var classes = React.addons.classSet({
                active: _.contains(me.state.categories, category.title),
                'facet-group-item': true
            });

            return (
                <li className={ classes } onClick={ me.onSelect.bind(null, category) }>{category.title}</li>
            );
        });
    },

    render() {
        var isBrowsing = this.props.isSearching || this.state.categories.length;

        var homeLinkClasses = React.addons.classSet({
            'active': !isBrowsing,
            'facet-group-item': true
        });

        return (
            <aside className="sidebar">
                <ul className="list-unstyled facet-group">
                    <li className={ homeLinkClasses } id="home" onClick={ this.onHomeClick }><i className="icon-shopping"></i> Center Home</li>
                </ul>
                <h3>Categories</h3>
                <ul className="list-unstyled facet-group">
                    { this.renderCategories() }
                </ul>
            </aside>
        );
    }

});

module.exports = Sidebar;
