var assert = require('yeoman-generator').assert;
var app;

describe("yosapy shoud work as expected", function() {

    beforeEach(function() {
        app = require("../app/index.js");
        parseEngine = require("../app/parseEngine.js");
    });


    it("app should contain required files", function() {
        assert.file(['gulpfile.js', 'app/index.js', 'app/templates/controller.js', 'app/templates/directive.js']);
    });

    it("getNgModuleName should return modulename as ngModule if tree is cant determone actual module", function() {
        var moduleName = parseEngine.getNgModuleName('null tree');
        expect(moduleName).toBe('ngModuleName');
    });

    it("getScopeVariables should give empty array if parsing fails", function() {
        var scopeFunctions = parseEngine.getScopeVariables(undefined, true);
        expect(scopeFunctions).not.toBeFalsy();
    });
});
