import * as uniq from "lodash.uniq"
import * as browserslist from "browserslist"

export function contains(str, substr) {
  return !!~str.indexOf(substr)
}

export function parseCaniuseData(feature, browsers) {
  var support = []
  var letters
  var letter

  browsers.forEach(function(browser) {
    support[browser] = {}
    for (var info in feature.stats[browser]) {
      letters = feature.stats[browser][info].split(" ")
      for (var i = 0; i < letters.length ; i++) {
        letter = letters[i]
        if (letter === "y"){ // min support asked, need to find the min value
          if (typeof support[browser][letter] === "undefined") {
            support[browser][letter] = Number.MAX_VALUE
          }
          if (parseFloat(info) < support[browser][letter]) {
            support[browser][letter] = parseFloat(info)
          }
        } else { // any other support, need to find the max value
          if (typeof support[browser][letter] === "undefined") {
            support[browser][letter] = Number.MIN_VALUE
          }
          if (parseFloat(info) > support[browser][letter]) {
            support[browser][letter] = parseFloat(info)
          }
        }
      }
    }
  })

  return support
}

export function cleanBrowsersList(browserList) {
  return uniq(browserslist(browserList).map((browser) => browser.split(" ")[0]))
}
