# unpiper

Recursively unpipe streams. Unpipes everything.

## Installation

```
npm install unpiper
```

### Example

```js
  var a = through()
  var b = through()
  var c = through()

  a = unpiper(a)

  a
  .pipe(b)
  .pipe(c)

  b.once('unpipe', function() {
    console.log('unpiped b')
  })
  c.once('unpipe', function() {
    console.log('unpiped c')
  })

  // c will be automatically unpiped.
  a.unpipe(b)
  // => unpiped b
  // => unpiped c
```

## License

MIT
