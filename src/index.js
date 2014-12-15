import {startsWith, contains, parseCaniuseData} from "./utils"
import * as fs from 'fs'
import * as memoize from 'lodash.memoize'
import * as uniq from 'lodash.uniq'
import * as browserslist from 'browserslist'

var browsers
function setBrowserScope(browserList) {
  browsers = uniq(browserslist(browserList).map((browser) => browser.split(' ')[0]))
}

function getBrowserScope() {
  return browsers
}

var features = fs
  .readdirSync('node_modules/caniuse-db/features-json')
  .map((file) => file.replace('.json', ''))

var parse = memoize(parseCaniuseData, function(feature, browsers) {
  return feature.title + browsers
})

function getSupport(query) {
  try {
    var feature = require('caniuse-db/features-json/'+query)
  } catch(e) {
    let res = search(query)
    if (res.length == 1) return getSupport(res[0])
    throw new ReferenceError('Please provide a proper feature name')
  }
  return parse(feature, browsers)
}

function isSupported(feature, browsers) {
  let data = require(`caniuse-db/features-json/${feature}`)

  return browserslist(browsers)
    .map((browser) => browser.split(' '))
    .every((browser) => data.stats[browser[0]][browser[1]] == 'y')
}

function find(query) {
  if (~features.indexOf(query)) { // exact match
    return query
  }

  return features.filter((file) => contains(file, query))
}

function getLatestStableBrowsers() {
  return browserslist.queries.lastVersions.select(1)
}

setBrowserScope()

export {getSupport, isSupported, find, getLatestStableBrowsers, setBrowserScope, getBrowserScope}
