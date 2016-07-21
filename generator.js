require('shelljs/global')
var path = require('path');
var dist = '';
try {
	dist = path.dirname(require.resolve('caniuse-api'));
} catch (e) {
	dist = path.join(__dirname, 'dist');
}

if (test('-d', dist)) {
  exec('node ' + path.join(dist, 'generate-features.js'))
  console.log('caniuse-api: Generation ok')
}
else {
  console.log('caniuse-api: No generation')
}
