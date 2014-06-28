var test = require('tape')
var through = require('through2')
var unpiper = require('../')


test('unpiping will unpipe all', function(t) {
  t.plan(2)

  var a = through()
  a.name = 'STREAM-A'
  var b = through()
  b.name = 'STREAM-B'
  var c = through()
  c.name = 'STREAM-C'

  a = unpiper(a)

  a
  .pipe(b)
  .pipe(c)

  b.once('unpipe', function(src) {
    t.equal(src, a)
  })
  c.once('unpipe', function(src) {
    t.equal(src, b)
  })

  a.unpipe(b)
})


test('unpiping will unpipe all even after repiping', function(t) {
  t.plan(3)

  var a = through()
  a.name = 'STREAM-A'
  var b = through()
  b.name = 'STREAM-B'
  var c = through()
  c.name = 'STREAM-C'

  a = unpiper(a)

  a
  .pipe(b)
  .pipe(c)

  b.on('unpipe', function(src) {
    t.equal(src, a)
  })
  c.on('unpipe', function(src) {
    t.equal(src, b)
  })

  a.unpipe(b)
  a.pipe(b)
  a.unpipe(b)
})

test('unpiping will unpipe children', function(t) {
  t.plan(4)
  var a = through()
  a.name = 'STREAM-A'
  var b = through()
  b.name = 'STREAM-B'
  var c = through()
  c.name = 'STREAM-C'
  var d = through()
  d.name = 'STREAM-D'
  var e = through()
  e.name = 'STREAM-E'

  unpiper(a)

  a
  .pipe(b)
  .pipe(c)
  b.pipe(d)
  .pipe(e)

  b.once('unpipe', function(src) {
    t.equal(src, a)
  })
  c.once('unpipe', function(src) {
    t.equal(src, b)
  })
  d.once('unpipe', function(src) {
    t.equal(src, b)
  })
  e.once('unpipe', function(src) {
    t.equal(src, d)
  })

  a.unpipe(b)

})
