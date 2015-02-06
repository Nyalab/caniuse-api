import fs from "fs"
import path from "path"

var caniusePath = path.dirname(require.resolve("caniuse-db/package.json"))
var featuresPath = path.join(caniusePath, "features-json")
var features = fs
  .readdirSync(featuresPath)
  .map((file) => file.replace(".json", ""))

var json = JSON.stringify(features, null, 2)

process.stdout.write(`var features = ${json}\nexport default features`)
