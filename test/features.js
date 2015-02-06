import test from "tape"
import features from "../src/features.js"

test("features.js", function(t) {
  t.ok(features.indexOf("css-variables") > -1 && features.indexOf("css-sticky") > -1, "should contains some features keys")
  t.end()
})
