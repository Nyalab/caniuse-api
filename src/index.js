import {startsWith, contains, parseCaniuseData} from "./lib/utils"
import * as fs from 'fs'

var browsers = ["ie", "firefox", "chrome", "ios_saf", "android"]
var allbrowsers = browsers.concat(["safari", "opera", "op_mini", "bb", "op_mob", "and_chr", "and_ff", "ie_mob"])

function sinceWhen(query, full) {
  var feature = require('caniuse-db/features-json/'+query)
  return parseCaniuseData(feature, full ? allbrowsers : browsers)
}

function search(query) {
  var files =
    fs
      .readdirSync('node_modules/caniuse-db/features-json')
      .map((file) => file.replace('.json', ''))

  if (~files.indexOf(query)) { // exact match
    return query
  }

  return files.filter((file) => contains(file, query))
}

export {sinceWhen, search}
