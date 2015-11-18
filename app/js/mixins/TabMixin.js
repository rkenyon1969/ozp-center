'use strict';

var { Link, State } = require('react-router');

var TabMixin = {

    mixins: [ State ],

    renderTabs: function (LINKS, params) {
        var me = this;

        var linkComponents = LINKS.map(function (link, i) {
            var isActive = me.isActive(link.to, link.params);
            var className = isActive ? 'active' : '';

            return (
                    <li key={i} className={ className } >
                    <Link to={ link.to } params={ link.params || params }>{ link.name }</Link>
                </li>
            );
        });

        return (
            <ul className="nav nav-tabs" role="tablist">
                { linkComponents }
            </ul>
        );
    }

};

module.exports = TabMixin;
