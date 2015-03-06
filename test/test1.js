var assert = require('yeoman-generator').assert;
var app;

describe("yosapy shoud work as expected", function() {

    beforeEach(function() {
        app = require("../app/index.js");
    });


    it("should contain required files", function() {
        assert.file(['gulpfile.js', 'app/index.js', 'app/templates/controller.js', 'app/templates/directive.js']);
    });

    it("should return modulename as ngModule if tree is cant determone actual module", function() {
        var moduleName = app.getNgModuleName('null tree');
        expect(moduleName).toBe('ngModuleName');
    });

});
