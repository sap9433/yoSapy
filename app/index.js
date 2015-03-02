var generators = require('yeoman-generator');
var astQuery = require('ast-query');
var _ = require('lodash');
var dirOrFilePath;

var loadAndParseFile = function(that) {
    //if (fs.existsSync(filename))
    var fileString = that.fs.read(dirOrFilePath);
    //Replace all white space character, comment , including space, tab, form feed, line feed
    return fileString.replace(/ \/\/.+\n/g, '').replace(/(\r\n|\n|\r)/gm, "");
};

var getNgModuleName = function(tree) {
    var ngModule;
    try {
        var module = tree.callExpression('angular.module').nodes[0].arguments[0];
        ngModule = module.value;
    } catch (err) {
        ngModule = '#ngModuleName#'
    }
    return ngModule;
};

var getTestableComponentName = function(fileString, componentType) {
    //for detailed regex explanation see https://regex101.com/.
    var regex = /angular[ .]+module\(['"]eikyoApp['"]\)[ .]+controller\(['"]([^'"]+)'/;
    var ngComponent = regex.exec(fileString);
    var componentName;
    try {
        componentName = ngComponent[1];
    } catch (err) {
        componentName = "testableComponentName"
    }
    return componentName;
};

var getScopeVariables = function(fileString) {
    var index = 1; // default to the first capturing group
    var matches = [];
    var match;
    var regex = /\$scope\.([^=\.\$]*)[ +]=/g
    while (match = regex.exec(fileString)) {
        matches.push(match[index]);
    }
    return matches;
}

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'dirOrFile',
            message: 'Directory or File name'
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

        this.fs.copyTpl(
            this.templatePath('controllerTest.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename,
                ngModule: getNgModuleName(tree),
                componentName: getTestableComponentName(fileString, 'controller'),
                scopeVariables: getScopeVariables(fileString)
            }
        );
    }
});
