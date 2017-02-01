import test from "tape"
import browserslist from "browserslist"
import * as caniuse from "../src/index"
import {cleanBrowsersList} from "../src/utils"

test("browserscope tests", (t) => {
  const defaultBrowserslist = cleanBrowsersList()

  t.deepEqual(caniuse.getBrowserScope().sort(), defaultBrowserslist.sort(), "default browser scope is browserslists one")
  caniuse.setBrowserScope(browserslist("Firefox 4, Opera 12.1"))
  t.deepEqual(caniuse.getBrowserScope().sort(), ["firefox", "opera"].sort(), "browser scope update does really update")

  t.end()
})

test("find tests", (t) => {
  t.deepEqual(caniuse.find("radius"), ["border-radius"], "`find` should find border-radius")
  t.deepEqual(caniuse.find("canaillou"), [], "non-existent property should return an empty array")
  t.ok(caniuse.find("border").length, "generic property name should return several results")
  t.throws(() => caniuse.find(null), "not a string should throw an exception")
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
  t.throws(() => caniuse.isSupported("canaillou", "chrome 37"),"throws if silly thing are asked")
  t.end()
})

// If for some reason the caniuse-db is not the same in browserslist and in caniuse-api
// browserslist could return browsers that caniuse-api doesn't know about and crashes
test("isSupported test with browsers caniuse doesn't know", (t) => {
  browserslist.data.notabrowser = {
    name: 'notabrowser',
    versions: ['1'],
    released: ['1']
  };
  browserslist.versionAliases.notabrowser = {}

  t.notOk(caniuse.isSupported("border-radius", "notabrowser 1"), "do not throw on non existing data")

  delete browserslist.data.notabrowser
  delete browserslist.versionAliases.notabrowser
  t.end()
})

test("getSupport tests", (t) => {
  caniuse.setBrowserScope()

  const borderRadiusFeature = require('caniuse-db/features-json/border-radius')
  const support = caniuse.getSupport("border-radius")
  t.ok(support.safari.y, "border-radius support is ok on some safari")
  t.throws(() => caniuse.getSupport("canaillou"),"throws if silly thing are asked")
  t.end()
})
