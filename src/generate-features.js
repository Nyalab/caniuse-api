import fs from "fs"
import path from "path"

const features = fs
  .readdirSync(
    path.join(
      path.dirname(require.resolve("caniuse-db/package.json")),
      "features-json"
    )
  )
  .map(file => {
    const feature = file.replace(".json", "")
    return `"${feature}": function() { return require("caniuse-db/features-json/${file}")}`
  })

fs.writeFileSync(path.join(__dirname, "..", "features.js"), `module.exports = {${features.join(",\n")}}`)
