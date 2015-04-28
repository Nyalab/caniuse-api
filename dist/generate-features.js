"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var path = _interopRequire(require("path"));

var features = fs.readdirSync(path.join(path.dirname(require.resolve("caniuse-db/package.json")), "features-json")).map(function (file) {
  return file.replace(".json", "");
}).map(function (feature) {
  return "\"" + feature + "\": function() { return require(\"caniuse-db/features-json/" + feature + "\")}";
});

console.log("\n  features list ready from caniuse-db");
var featuresFile = path.join(__dirname, "..", "features.js");
fs.writeFileSync(featuresFile, "module.exports = {" + features.join(",\n") + "}");
console.log("  " + featuresFile + " done\n");