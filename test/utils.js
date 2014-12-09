import * as test from "tape"
import {startsWith, contains, parseCaniuseData} from "../src/utils"

test("startsWith should work", (t) => {
  t.is(startsWith("abc", "a"), true, "abc starts with a")
  t.isNot(startsWith("abc", "bc"), true, "abc does not start with bc")
  t.is(startsWith("abc", ""), true, "startsWith empty string is true")
  t.end()
})

test("contains should work", (t) => {
  t.is(contains("abc", "a"), true, "abc contains b")
  t.isNot(contains("abc", "d"), true, "abc does not contain with d")
  t.is(contains("abc", ""), true, "contains empty string is true")
  t.end()
})

test("parseCaniuseData should work", (t) => {
  t.end()
})

