var assert = require('yeoman-generator').assert;

describe("yosapy shoud work as expected", function() {

    it("should contain required files", function() {
        assert.file(['gulpfile.js', 'app/index.js', 'app/templates/controller.js', 'app/templates/directive.js']);
    });

    it("contains spec with an expectation", function() {


    });

});
