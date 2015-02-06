import memoize from "lodash.memoize"
import browserslist from "browserslist"
import features from "./features.js"
import {contains, parseCaniuseData, cleanBrowsersList} from "./utils"

var browsers

export function getBrowserScope() {
  return browsers
}

export function setBrowserScope(browserList) {
  browsers = cleanBrowsersList(browserList)
}

var parse = memoize(parseCaniuseData, function(feature, browsers) {
  return feature.title + browsers
})

export function getSupport(query) {
  let feature
  try {
    feature = require(`caniuse-db/features-json/${query}`)
  } catch(e) {
    let res = find(query)
    if (res.length === 1) return getSupport(res[0])
    throw new ReferenceError("Please provide a proper feature name")
  }
  return parse(feature, browsers)
}

export function isSupported(feature, browsers) {
  let data
  try {
    data = require(`caniuse-db/features-json/${feature}`)
  } catch(e) {
    let res = find(feature)
    if (res.length === 1) {
      data = require(`caniuse-db/features-json/${res[0]}`)
    } else {
      throw new ReferenceError("Please provide a proper feature name")
    }
  }

  return browserslist(browsers)
    .map((browser) => browser.split(" "))
    .every((browser) => data.stats[browser[0]][browser[1]] === "y")
}

export function find(query) {
  if (~features.indexOf(query)) { // exact match
    return query
  }

  return features.filter((file) => contains(file, query))
}

export function getLatestStableBrowsers() {
  return browserslist.queries.lastVersions.select(1)
}

setBrowserScope()
