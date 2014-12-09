# nya-caniuse

request the caniuse data to check browsers compatibilities

## Installation

```console
$ npm install nya-caniuse
```

## Usage

```javascript
var caniuse = require('nya-caniuse')

// YOUR CODE
```

## API

#### `caniuse.sinceWhen(query, fullResults)`

_ask since when a feature is available_

* 'y': Since which browser version the feature is available
* 'n': Up to which browser version the feature is unavailable

Ex:

```javascript
caniuse.sinceWhen('border-radius', true)
/*
[ ie: { n: 8, y: 9 },
  firefox: { n: 3, y: 3.5 },
  chrome: { y: 4 },
  ios_saf: { y: 4, n: 3.2 },
  android: { y: 2.3, n: 2.2 },
  safari: { y: 4, n: 3.2 },
  opera: { n: 9, y: 10.5, a: 10 },
  op_mini: { n: 5 },
  bb: { y: 7 },
  op_mob: { n: 10, y: 11 },
  and_chr: { y: 39 },
  and_ff: { y: 33 },
  ie_mob: { y: 10 } ]
*/
```

#### `caniuse.search(query)`

_search for a caniuse feature name_

Ex:

```javascript
caniuse.query('radius') // ['border-radius']
caniuse.query('nothingness') // []
caniuse.query('css3')
/*
[ 'css3-boxsizing',
  'css3-colors',
  'css3-cursors-newer',
  'css3-cursors',
  'css3-tabsize' ]
*/
```

---

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
