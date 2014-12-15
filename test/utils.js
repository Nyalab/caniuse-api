import * as test from "tape"
import {contains, parseCaniuseData} from "../src/utils"

test("contains should work", (t) => {
  t.is(contains("abc", "a"), true, "abc contains b")
  t.isNot(contains("abc", "d"), true, "abc does not contain with d")
  t.is(contains("abc", ""), true, "contains empty string is true")
  t.end()
})

test("parseCaniuseData should work", (t) => {
  t.end()
})

