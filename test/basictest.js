var generator = require('yeoman-generator'),
    assert = generator.assert,
    fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'testInputFiles/testController.js'),
    rawFile = fs.readFileSync(filePath).toString(),
    console.log(rawFile),
    parsedFile = parseEngine.loadAndParseFile(rawFile),
    app;

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

    it("getScopeVariables should give proper scope variables and methods", function() {
        var scopeFunctions = parseEngine.getScopeVariables(parsedFile, true);
        var scopeVariables = parseEngine.getScopeVariables(parsedFile);
        expect(scopeFunctions.toString()).toBe(['addtoCompare', 'doneComparing', 'removeFromCompare'].toString());
        console.log(scopeVariables);
        expect(scopeVariables.toString()).toBe(['tobeCompared',
            'entireList',
            'addtoCompare',
            'doneComparing',
            'removeFromCompare'
        ].toString());

    });
});
