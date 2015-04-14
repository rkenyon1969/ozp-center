var path = require("path");
var webpack = require("webpack");

var ENV = process.env.NODE_ENV || "development";

module.exports = {
    // This is the main file that should include all other JS files
    entry: "./app/js/main.js",
    target: "web",
    debug: true,
    cache: true,
    output: {
        path: path.join(__dirname, "dist/assets"),
        publicPath: "assets/",
        // If you want to generate a filename with a hash of the content (for cache-busting)
        // filename: "main-[hash].js",
        filename: "main.js",
        chunkFilename: "webpack.[hash].js"
    },
    resolve: {
        alias: {
            react$: "react/addons",
            jquery$: "jquery/dist/jquery",
            bootstrap$: "bootstrap-sass/assets/javascripts/bootstrap",
            carouFredSel$: "carouFredSel/jquery.carouFredSel-6.2.1",
            lodash: "lodash-amd/modern",
            "magnific-popup$": "magnific-popup/dist/jquery.magnific-popup",
            w2ui$: "w2ui/dist/w2ui",
            classification$: "ozp-classification/jquery.classification.js",
            "ozp-react-commons": "ozp-react-commons/app/js",
            tether$: "tether/tether"
        },
        // Configure webpack to look for required files in bower and node
        modulesDirectories: ['./bower_components', './node_modules']
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: "jsxhint-loader",
            exclude: /node_modules|bower_components|gulp|dist/
        }],
        loaders: [
            { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
            {
                test: /\.jsx?$/,
                loader: "jsx-loader?insertPragma=React.DOM!babel-loader?experimental&optional=runtime",
                include: [
                    path.join(__dirname, 'app/js'),
                    path.join(__dirname, 'node_modules/ozp-react-commons/app/js')
                ]
            },
            // This is done separetly to not add 'use strict' as the plugin leaks global vars
            // When this is fixed, include below can be moved in the above config
            {
                test: /\.jsx?$/,
                loader: "jsx-loader",
                include: [
                    path.join(__dirname, 'node_modules/react-datepicker/src')
                ]
            }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify(ENV),
            }

        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        })
    ]
};
