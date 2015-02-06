import * as test from "tape"

test("features.json", function(t) {
  var features = require("../features.json")
  t.ok(features.indexOf("css-variables") > -1 && features.indexOf("css-sticky") > -1, "should contains some features keys")

  t.end()
})
