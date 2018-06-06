import uniq from "lodash.uniq"
import browserslist from "browserslist"

export function contains(str, substr) {
  return !!~str.indexOf(substr)
}

export function parseCaniuseData(feature, browsers) {
  var support = {}
  var letters
  var letter

  browsers.forEach(function(browser) {
    support[browser] = {}
    for (var info in feature.stats[browser]) {
      letters = feature.stats[browser][info].replace(/#\d+/, "").trim().split(" ")
      info = parseFloat(info.split("-")[0]) //if info is a range, take the left
      if (isNaN(info)) continue
      for (var i = 0; i < letters.length ; i++) {
        letter = letters[i]
        if (letter === "d") { // skip this letter, we don't support it yet
          continue
        } else if (letter === "y"){ // min support asked, need to find the min value
          if (typeof support[browser][letter] === "undefined" ||
              info < support[browser][letter]) {
            support[browser][letter] = info
          }
        } else { // any other support, need to find the max value
          if (typeof support[browser][letter] === "undefined" ||
              info > support[browser][letter]) {
            support[browser][letter] = info
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
