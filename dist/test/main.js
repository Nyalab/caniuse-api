"use strict";

var test = require("tape");

var startsWith = require("../lib/utils").startsWith;
var contains = require("../lib/utils").contains;
var parseCaniuseData = require("../lib/utils").parseCaniuseData;


test("startsWith should work", function (t) {
  t.ok(startsWith("abc", "a"), "abc starts with a");
  t.notOk(startsWith("abc", "bc"), "abc does not start with bc");
  t.ok(startsWith("abc", ""), "startsWith empty string is true");
  t.end();
});

test("contains should work", function (t) {
  t.ok(contains("abc", "a"), "abc contains b");
  t.notOk(contains("abc", "d"), "abc does not contain with d");
  t.ok(contains("abc", ""), "contains empty string is true");
  t.end();
});