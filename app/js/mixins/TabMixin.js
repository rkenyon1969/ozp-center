/**
 * @jsx React.DOM
 */

'use strict';

var Router = require('react-router');
var Link = Router.Link;
var ActiveState = Router.ActiveState;

var TabMixin = {

    mixins: [ ActiveState ],

    renderTabs: function (LINKS, params) {
        var me = this;

        /* jshint ignore:start */
        var linkComponents = LINKS.map(function (link) {
            var isActive = me.isActive(link.to);
            var className = isActive ? 'active' : '';
            
            return (
                <li className={ className }>
                    <Link to={ link.to } params={ params }>{ link.name }</Link>
                </li>
            );
        });

        return (
            <ul className="nav nav-tabs" role="tablist">
                { linkComponents }
            </ul>
        );
        /* jshint ignore:end */
    }

};

module.exports = TabMixin;