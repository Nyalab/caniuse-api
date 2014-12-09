import * as test from "tape"
import {startsWith, contains, parseCaniuseData} from "../lib/utils"

test("startsWith should work", (t) => {
  t.ok(startsWith("abc", "a"), "abc starts with a")
  t.notOk(startsWith("abc", "bc"), "abc does not start with bc")
  t.ok(startsWith("abc", ""), "startsWith empty string is true")
  t.end()
})

test("contains should work", (t) => {
  t.ok(contains("abc", "a"), "abc contains b")
  t.notOk(contains("abc", "d"), "abc does not contain with d")
  t.ok(contains("abc", ""), "contains empty string is true")
  t.end()
})

test("parseCaniuseData should work", (t) => {
  t.ok(contains("abc", "a"), "abc contains b")
  t.notOk(contains("abc", "d"), "abc does not contain with d")
  t.ok(contains("abc", ""), "contains empty string is true")
  t.end()
})

