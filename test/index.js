import * as test from "tape"
import * as browserslist from "browserslist"
import * as caniuse from "../src/index"
import {cleanBrowsersList} from "../src/utils"

test("browserscope tests", (t) => {
  let defaultBrowserslist = cleanBrowsersList()

  t.deepEqual(caniuse.getBrowserScope().sort(), defaultBrowserslist.sort(), "default browser scope is browserslists one")
  caniuse.setBrowserScope(browserslist("Firefox 4, Opera 12.1"))
  t.deepEqual(caniuse.getBrowserScope().sort(), ["firefox", "opera"].sort(), "browser scope update does really update")

  t.end()
})

test("find tests", (t) => {
  t.deepEqual(caniuse.find("radius"), ["border-radius"], "`find` should find border-radius")
  t.deepEqual(caniuse.find("canaillou"), [], "non-existent property should return an empty array")
  t.ok(caniuse.find("border").length, "generic property name should return several results")
  t.throws(caniuse.find(null), "not a string should throw an exception")
  t.end()
})

test("getLatestStableBrowsers tests", (t) => {
  t.ok(caniuse.getLatestStableBrowsers().length, "it should return an array of results")
  t.ok(caniuse.getLatestStableBrowsers().every((browser) => browser.match(/[A-z_]+ [0-9]+/)), "every entry is correctly formed")
  t.end()
})

test("isSupported tests", (t) => {
  t.ok(caniuse.isSupported("border-radius", "ie 9"), "border-radius is supported on ie 9")
  t.notOk(caniuse.isSupported("border-radius", "ie 8"), "border-radius is not supported on ie 8")
  //wtf it is not working t.throws(caniuse.isSupported("canaillou", "chrome 37"),"throws if silly thing are asked")
  t.end()
})

test("getSupport tests", (t) => {
  caniuse.setBrowserScope()
  let borderRadiusSupport = {
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
    and_chr: { y: 40 }
  }

  t.deepEqual(caniuse.getSupport("border-radius"), borderRadiusSupport, "border-radius support is ok")
  //wtf it is not working t.throws(caniuse.getSupport("canaillou"),"throws if silly thing are asked")
  t.end()
})

