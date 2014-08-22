/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    ReactTabs = require('react-tabs'),
    Tab       = ReactTabs.Tab,
    Tabs      = ReactTabs.Tabs,
    TabList   = ReactTabs.TabList,
    merge     = require('react/lib/merge'),
    Input     = require('../input');

var getId = (function () {
    var counter = 0;

    return function () {
        return 'tabselect-' + counter++;
    };
})();

var TabSelect = React.createClass({
    getInitialState: function () {
        var tabs = [],
            values = {};

        React.Children.forEach(this.props.children, function (child) {
            var id = getId();
            tabs.push({id: id, label: child.props.label});
            values[id] = child.props.value;
        });

        return {tabs: tabs, values: values};
    },

    handleChange: function (event) {
        //change is triggered via the input - so, trigger the tab switch
        $(event.target).closest('li').click();
        
        var id = $(event.target).attr('id');
        this.props.itemValue.set(this.state.values[id]);
    },

    /*jshint ignore:start */
    render: function () {
        var tabs = this.state.tabs.map(function (tab) {
            return (
                <Tab>
                    <Input onChange={this.handleChange} id={tab.id} label={tab.label} type="radio" name={this.props.name} />
                </Tab>
            );
        }, this);

        return (
            <Tabs>
                <TabList>
                    {tabs}
                </TabList>
                {this.props.children}
            </Tabs>
        );
    }
    /*jshint ignore:end */
});

module.exports = TabSelect;
