'use strict';

var React = require('react');
var SelectBox = require('react-select-box');

var SystemStateMixin = require('../../mixins/SystemStateMixin');

var Organizations = React.createClass({
    mixins: [SystemStateMixin],

    propTypes: {
        value: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    onChange(organizations) {
        this.props.onChange(organizations);
    },

    render() {
        return (
            <SelectBox className="SelectBox__Organizations" label="Organizations" onChange={this.onChange} value={this.props.value} multiple>
                {
                    this.state.system.organizations.map((x) =>
                        <option key={x.id} value={x.title}>{x.shortName}</option>
                    )
                }
            </SelectBox>
        );
    }
});

module.exports = Organizations;
