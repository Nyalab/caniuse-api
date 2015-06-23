import test from "tape"
import browserslist from "browserslist"
import uniq from "lodash/array/uniq"
import {contains, parseCaniuseData, cleanBrowsersList} from "../src/utils"

test("contains should work", (t) => {
  t.is(contains("abc", "a"), true, "abc contains b")
  t.isNot(contains("abc", "d"), true, "abc does not contain with d")
  t.is(contains("abc", ""), true, "contains empty string is true")
  t.end()
})

test("parseCaniuseData should work", (t) => {
  let browsers = cleanBrowsersList()

  let borderRadiusFeature = require('caniuse-db/features-json/border-radius')
  let correctSupport = {
    safari: { y: 3.1, x: 4, '#1': 6.1 },
    opera: { n: 10, y: 10.5 },
    op_mini: { n: 5 },
    ios_saf: { y: 3.2, x: 3.2 },
    ie_mob: { y: 10 },
    ie: { n: 8, y: 9 },
    firefox: { a: 2, x: 3.6, y: 3 },
    chrome: { y: 4, x: 4 },
    android: { y: 2.1, x: 2.1 },
    and_uc: { y: 9.9 },
    // workaround for https://github.com/Nyalab/caniuse-api/issues/19
    and_chr: { y: parseInt(Object.keys(borderRadiusFeature.stats.and_chr).filter(v => borderRadiusFeature.stats.and_chr[v] === "y").pop()) }
  }

  t.deepEqual(parseCaniuseData(borderRadiusFeature, browsers), correctSupport, "border-radius support is correct")
  t.deepEqual(parseCaniuseData(borderRadiusFeature, []), [], "passing an empty browser list returns an empty array")

  t.end()
})

test("cleanBrowsersList should work", (t) => {
  let dirtyList = ["firefox 4", "firefox 3.6", "opera 12.1", "ie 8", "ie 9", "chrome 37"]
  let cleanList = ["firefox", "opera", "ie", "chrome"]

  t.deepEqual(cleanBrowsersList(dirtyList).sort(), cleanList.sort(), "remove version numbers and deduplicate the list")
  t.deepEqual(cleanBrowsersList([]), [], "giving empty array returns empty array")
  t.throws(cleanBrowsersList(null), "giving not an array should throw")

  t.end()
})
