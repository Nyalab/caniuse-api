import fs from "fs"
import path from "path"

const features = fs
  .readdirSync(
    path.join(
      path.dirname(require.resolve("caniuse-db/package.json")),
      "features-json"
    )
  )
  .map(file => file.replace(".json", ""))
  .map(feature => `"${feature}": function() { return require("caniuse-db/features-json/${feature}")}`)

console.log("  features list ready from caniuse-db")
const featuresFile = path.join(__dirname, "..", "features.js")
fs.writeFileSync(featuresFile, `module.exports = {${features.join(",\n")}}`)
console.log(`  ${featuresFile} done\n`)
