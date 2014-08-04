/** @jsx React.DOM */

var React = require('react/addons');

var APP = React.createClass({

    render: function () {
        return (
            <div>
                <p>
                  This template brings together all the pieces you need to start building your first React app.
                  Gulp is used for orchastrating the build process, and Webpack is used to combine the Javascripts together.
                </p>
            </div>
        );
    }

});



module.exports = APP;