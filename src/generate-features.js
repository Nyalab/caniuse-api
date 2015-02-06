import * as fs from "fs"
import * as path from "path"

var caniusePath = path.dirname(require.resolve("caniuse-db/package.json"))
var featuresPath = path.join(caniusePath, "features-json")
var features = fs
  .readdirSync(featuresPath)
  .map((file) => file.replace(".json", ""))

fs.writeFileSync(path.join(__dirname, "..", "features.json"), JSON.stringify(features, null, 2))
