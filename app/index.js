var generators = require('yeoman-generator'),
    astQuery = require('ast-query'),
    _ = require('lodash'),
    dirOrFilePath;

var loadAndParseFile = function(that) {
    //if (fs.existsSync(filename))
    var fileString = that.fs.read(dirOrFilePath);
    //Replace all white space character, comment , including space, tab, form feed, line feed
    return fileString
        .replace(/ \/\/.+\n/g, '') //remove single line comment
        .replace(/\/\*([\s\S]*?)\*\//g, '') //remove multiline comment
        .replace(/(\r\n|\n|\r)/gm, "") //remove carriage and returns
        .replace(/\s{2,}/g, ' '); //replace multiple space with single space
};

var getNgModuleName = function(tree) {
    var ngModule;
    try {
        var module = tree.callExpression('angular.module').nodes[0].arguments[0];
        ngModule = module.value;
    } catch (err) {
        ngModule = 'ngModuleName'
    }
    return ngModule;
};

var getTestableComponentName = function(fileString, componentType, moduleName) {
    //for detailed regex explanation see https://regex101.com/.
    var regex = new RegExp("angular[ .]+module\\([\'\"]" + moduleName + "[\'\"]\\)[ .]+" + componentType + "\\([\'\"]([^\'\"]+)[\'\"]");
    var componentName;
    try {
        componentName = regex.exec(fileString)[1];
    } catch (err) {
        componentName = "testableComponentName"
    }
    return componentName;
};

var getScopeVariables = function(fileString, onlyFunctions) {
    var index = 1,
        matches = [],
        regex = /\$scope\.([^=\.\$]*)[ +]=/g,
        match;

    if (onlyFunctions) {
        regex = /\$scope\.([^=\.\$]*) = function[ \(]/g;
    }
    try {
        while (match = regex.exec(fileString)) {
            matches.push(match[index]);
        }
    } catch (err) {
        if (onlyFunctions) {
            matches = ['scopeFunction1', 'scopeFunction1'];
        } else {
            matches = ['scopeVariable1', 'scopeVariable2', 'scopeFunction1', 'scopeFunction1'];
        }
    }
    return matches;
};

module.exports = generators.Base.extend({
    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'dirOrFile',
            message: 'Absolute path of the File to be tested'
        }, function(answers) {
            dirOrFilePath = answers.dirOrFile.trim();
            done();
        }.bind(this));
    },
    writing: function() {
        var dirOrFileName = dirOrFilePath.split('/').reverse()[0];
        var fileString = loadAndParseFile(this);
        var filename = dirOrFileName.replace('.js', '');
        var tree = astQuery(fileString);
        var moduleName = getNgModuleName(tree);

        this.fs.copyTpl(
            this.templatePath('controllerTest.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename,
                ngModule: moduleName,
                componentName: getTestableComponentName(fileString, 'controller', moduleName),
                scopeVariables: getScopeVariables(fileString),
                scopeFunctions: getScopeVariables(fileString, true)
            }
        );
    }
});
