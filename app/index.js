var parseEngine = require('./parseEngine.js'),
    generators = require('yeoman-generator'),
    astQuery = require('ast-query'),
    clc = require('cli-color'),
    dirOrFilePath;

var readFile = function(fs, dirOrFilePath) {
    //if (fs.existsSync(filename))
    var fileString = fs.read(dirOrFilePath);
    return fileString;
};

module.exports = generators.Base.extend({
    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'dirOrFile',
            message: clc.blue.bgYellow('Absolute path of the File to be tested')
        }, function(answers) {
            dirOrFilePath = answers.dirOrFile.trim();
            done();
        }.bind(this));
    },
    writing: function() {
        var pathArray = dirOrFilePath.split('/').reverse();
        var dirOrFileName = pathArray[0];
        var componentType;
        if (pathArray.indexOf('controllers') > -1) {
            componentType = 'controller';
        } else if (pathArray.indexOf('directives') > -1) {
            componentType = 'directive';
        }

        var rawFile = readFile(this.fs, dirOrFilePath);
        var fileString = parseEngine.loadAndParseFile(rawFile);

        var filename = dirOrFileName.replace('.js', '');
        var tree = astQuery(fileString);
        var moduleName = parseEngine.getNgModuleName(tree);

        var getScopeFunctions = parseEngine.getScopeVariables(fileString, true);
        var methodArguments = parseEngine.getArgumentLists(fileString, getScopeFunctions);

        this.fs.copyTpl(
            this.templatePath(componentType + '.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename,
                ngModule: moduleName,
                componentName: parseEngine.getTestableComponentName(fileString, componentType, moduleName),
                scopeVariables: parseEngine.getScopeVariables(fileString),
                scopeFunctions: getScopeFunctions,
                undefinedScopreVar: parseEngine.undefinedScopreVar(fileString),
                methodArguments: methodArguments
            }
        );

        console.
        log(
            clc.blue.bgYellow('Your test ' + componentType + ' is succesfully created at \n' + this.destinationRoot() + '/' + dirOrFileName)
        );
    }
});
