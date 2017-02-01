import test from "tape"
import browserslist from "browserslist"
import uniq from "lodash.uniq"
import {contains, parseCaniuseData, cleanBrowsersList} from "../src/utils"

test("contains should work", (t) => {
  t.is(contains("abc", "a"), true, "abc contains b")
  t.isNot(contains("abc", "d"), true, "abc does not contain with d")
  t.is(contains("abc", ""), true, "contains empty string is true")
  t.end()
})

test("parseCaniuseData should work", (t) => {
  const browsers = cleanBrowsersList()
  const borderRadiusFeature = require('caniuse-db/features-json/border-radius')
  const parsed = parseCaniuseData(borderRadiusFeature, browsers)

  t.ok(parsed.safari.y, "border-radius support is ok on some safari")
  t.ok(parsed.firefox.y, "border-radius support is ok on some firefox")
  t.ok(parsed.chrome.y, "border-radius support is ok on some chrome")
  t.deepEqual(parseCaniuseData(borderRadiusFeature, []), [], "passing an empty browser list returns an empty array")

  t.end()
})

test("cleanBrowsersList should work", (t) => {
  const dirtyList = ["firefox 4", "firefox 3.6", "opera 12.1", "ie 8", "ie 9", "chrome 37"]
  const cleanList = ["firefox", "opera", "ie", "chrome"]

  t.deepEqual(cleanBrowsersList(dirtyList).sort(), cleanList.sort(), "remove version numbers and deduplicate the list")
  t.deepEqual(cleanBrowsersList([]), [], "giving empty array returns empty array")

  t.end()
})
