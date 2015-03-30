import test from "tape"
import features from "../features"
const featuresList = Object.keys(features)
test("features.json", function(t) {
  t.ok(
    (
      featuresList.indexOf("css-variables") > -1 &&
      featuresList.indexOf("css-sticky") > -1
    ),
    "should contains some features keys")

  t.end()
})
