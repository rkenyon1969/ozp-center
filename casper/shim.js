// Necessary until capserjs has a stable version compatible with phantomjs 2.0
// (http://stackoverflow.com/questions/25359247/casperjs-bind-issue)
function turnOnShim(casper) {
    casper.on('page.initialized', function() {
        casper.evaluate(function() {
            var isFunction = function(o) {
                return typeof o == 'function';
            };

            var bind,
                slice = [].slice,
                proto = Function.prototype,
                featureMap;

            featureMap = {
                'function-bind': 'bind'
            };

            function has(feature) {
                var prop = featureMap[feature];
                return isFunction(proto[prop]);
            }

            // check for missing features
            if (!has('function-bind')) {
                // adapted from Mozilla Developer Network example at
                // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
                bind = function bind(obj) {
                    var args = slice.call(arguments, 1),
                        self = this,
                        nop = function() {
                        },
                        bound = function() {
                            return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
                        };
                    nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
                    bound.prototype = new nop();
                    return bound;
                };
                proto.bind = bind;
            }
        });
    });
}

module.exports = turnOnShim;
