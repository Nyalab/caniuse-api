"use strict";

var startsWith = require("./lib/utils").startsWith;
var contains = require("./lib/utils").contains;
var parseCaniuseData = require("./lib/utils").parseCaniuseData;
var fs = require('fs');

var browsers = ["ie", "firefox", "chrome", "ios_saf", "android"];
var allbrowsers = browsers.concat(["safari", "opera", "op_mini", "bb", "op_mob", "and_chr", "and_ff", "ie_mob"]);

function sinceWhen(query, full) {
  var feature = require("caniuse-db/features-json/" + query);
  return parseCaniuseData(feature, full ? allbrowsers : browsers);
}

function search(query) {
  var files = fs.readdirSync("node_modules/caniuse-db/features-json").map(function (file) {
    return file.replace(".json", "");
  });

  if (~files.indexOf(query)) {
    // exact match
    return query;
  }

  return files.filter(function (file) {
    return contains(file, query);
  });
}

exports.sinceWhen = sinceWhen;
exports.search = search;