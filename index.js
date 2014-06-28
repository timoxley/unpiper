"use strict"

var slice = Function.call.bind(Array.prototype.slice)

module.exports = function unpiper(stream) {

  stream.removeListener('unpipe', onUnpipe)
  stream.on('unpipe', onUnpipe)

  var oldPipe = stream.pipe
  stream.pipe = function pipe(dest) {
    unpiper(dest)
    return oldPipe.apply(this, arguments)
  }

  function onUnpipe(src) {
    if (!this._readableState.pipes) return // no pipes
    if (!this._readableState.pipes.forEach) {
      // if only 1 pipe, pipes is an object
      return this.unpipe(this._readableState.pipes)
    }
    // slice as unpiping will mutate the .pipes array
    this._readableState.pipes.slice().forEach(function(dst) {
      this.unpipe(dst)
    }, this)
  }

  return stream
}
