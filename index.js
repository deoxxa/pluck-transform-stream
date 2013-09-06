var dotty = require("dotty"),
    stream = require("stream");

var PluckTransformStream = module.exports = function PluckTransformStream(options) {
  options = options || {};

  options.objectMode = true;

  stream.Transform.call(this, options);

  this._keys = options.keys || [];
};
PluckTransformStream.prototype = Object.create(stream.Transform.prototype, {constructor: {value: PluckTransformStream}});

PluckTransformStream.prototype._transform = function _transform(input, encoding, done) {
  this.push(this._keys.map(function(e) {
    return dotty.get(input, e);
  }));

  return done();
};
