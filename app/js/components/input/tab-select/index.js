/** @jsx React.DOM */
'use strict';

var React     = require('react'),
    ReactTabs = require('react-tabs'),
    Tab       = ReactTabs.Tab,
    Tabs      = ReactTabs.Tabs,
    TabList   = ReactTabs.TabList,
    merge     = require('react/lib/merge');

var getId = (function () {
    var counter = 0;

    return function () {
        return 'tabselect-' + counter++;
    };
})();

var TabSelect = React.createClass({
    getInitialState: function () {
        var tabProps = [];

        React.Children.forEach(this.props.children, function (child) {
            tabProps.push({
                checked: false,
                value: child.props.title,
                id: getId()
            });
        });

        tabProps[0].checked = true;

        return {tabProps: tabProps};
    },

    handleChange: function (event) {
        //change is triggered via the input - so, trigger the tab switch
        $(event.target).closest('li').click();

        var newValue = event.target.value;
        var newProps = this.state.tabProps.map(function (props) {
            var checked = props.value === newValue ? true : false;
            return {
                value: props.value,
                checked: checked,
                id: props.id
            };
        });

        this.setState({tabProps: newProps});
    },

    /*jshint ignore:start */
    render: function () {

        var inputId = getId();

        var tabList = this.state.tabProps.map(function (props) {
            return (
                <Tab>
                    <div className="tab-selector">
                        <input onChange={this.handleChange} type="radio"
                               name={this.props.name} value={props.value}
                               checked={props.checked}
                               id={props.id}>
                        </input>
                        <label htmlFor={props.id}>
                            <small>{props.value}</small>
                        </label>
                    </div>
                </Tab>
            );
        }, this);

        return (
            <Tabs>
                <TabList>
                    {tabList}
                </TabList>
                {this.props.children}
            </Tabs>
        );
    }
    /*jshint ignore:end */
});

module.exports = TabSelect;
