import memoize from "lodash.memoize"
import browserslist from "browserslist"

import {contains, parseCaniuseData, cleanBrowsersList} from "./utils"
import db from "caniuse-db/data.json"

const features = db.data
const featuresList = Object.keys(features)

let browsers
function setBrowserScope(browserList) {
  browsers = cleanBrowsersList(browserList)
}

function getBrowserScope() {
  return browsers
}

const parse = memoize(parseCaniuseData, function(feature, browsers) {
  return feature.title + browsers
})

function getSupport(query) {
  let feature
  try {
    feature = features[query]
  } catch(e) {
    let res = find(query)
    if (res.length === 1) return getSupport(res[0])
    throw new ReferenceError(`Please provide a proper feature name. Cannot find ${query}`)
  }
  return parse(feature, browsers)
}

function isSupported(feature, browsers) {
  let data
  try {
    data = features[feature]
  } catch(e) {
    let res = find(feature)
    if (res.length === 1) {
      data = features[res[0]]
    } else {
      throw new ReferenceError(`Please provide a proper feature name. Cannot find ${feature}`)
    }
  }

  return browserslist(browsers)
    .map((browser) => browser.split(" "))
    .every((browser) => data.stats[browser[0]] && data.stats[browser[0]][browser[1]] === "y")
}

function find(query) {
  if (typeof query !== "string") {
    throw new TypeError("The `query` parameter should be a string.")
  }

  if (~featuresList.indexOf(query)) { // exact match
    return query
  }

  return featuresList.filter((file) => contains(file, query))
}

function getLatestStableBrowsers() {
  return browserslist.queries.lastVersions.select(1)
}

setBrowserScope()

export {
  featuresList as features,
  getSupport,
  isSupported,
  find,
  getLatestStableBrowsers,
  setBrowserScope,
  getBrowserScope
}
