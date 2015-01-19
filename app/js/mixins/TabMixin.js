'use strict';

var { Link, State } = require('react-router');

var TabMixin = {

    mixins: [ State ],

    renderTabs: function (LINKS, params) {
        var me = this;

        /* jshint ignore:start */
        var linkComponents = LINKS.map(function (link) {
            var isActive = me.isActive(link.to);
            var className = isActive ? 'active' : '';

            return (
                <li className={ className } key={ link.to }>
                    <Link to={ link.to } params={ link.params || params }>{ link.name }</Link>
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
