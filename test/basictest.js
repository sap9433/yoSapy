var app = require("../app/index.js"),
    parseEngine = require("../app/parseEngine.js"),
    generator = require('yeoman-generator'),
    assert = generator.assert,
    fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'testInputFiles/testController.js'),
    rawFile = fs.readFileSync(filePath).toString(),
    parsedFile = parseEngine.loadAndParseFile(rawFile);


describe("yosapy shoud work as expected", function() {

    beforeEach(function() {

    });


    it("app should contain required files", function() {
        assert.file(['gulpfile.js', 'app/index.js', 'app/templates/controller.js', 'app/templates/directive.js', 'app/parseEngine.js']);
    });

    it("getNgModuleName should return modulename as ngModule if tree is cant determone actual module", function() {
        var moduleName = parseEngine.getNgModuleName('null tree');
        expect(moduleName).toBe('ngModuleName');
    });

    it("getScopeVariables should give proper scope variables and methods", function() {
        var scopeFunctions = parseEngine.getScopeVariables(parsedFile, true);
        var scopeVariables = parseEngine.getScopeVariables(parsedFile);
        expect(scopeFunctions.toString()).toBe(['addtoCompare', 'doneComparing', 'removeFromCompare'].toString());
        expect(scopeVariables.toString()).toBe(['tobeCompared',
            'entireList',
            'addtoCompare',
            'doneComparing',
            'removeFromCompare'
        ].toString());

    });

    it("undefinedScopreVar should give all scope variables which are not defined but used.", function() {
        var undefinedScopreVar = parseEngine.undefinedScopreVar(parsedFile);
        console.log(undefinedScopreVar.toString());
        expect(undefinedScopreVar.toString()).toBe(['$parent'].toString());
    });

    it("getArgumentLists should give proper argument list JSON", function() {
        var scopeFunctions = parseEngine.getScopeVariables(parsedFile, true);
        var argumentListJson = parseEngine.getArgumentLists(parsedFile, scopeFunctions);
        expect(argumentListJson.toString()).toBe({
            "addtoCompare": "'employeeId',' branchCode',' name',' localHqId',' localHqName',' regionHqId',' regionHqName'",
            "doneComparing": "'actionName'",
            "removeFromCompare": "'employeeId',' branchCode'"
        }.toString());
    });
});
