var assert = require('yeoman-generator').assert;

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    assert.file(['gulpfile.js', 'app/index.js']);
  });
});