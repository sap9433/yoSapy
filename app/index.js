var parseEngine = require('./parseEngine.js'),
    generators = require('yeoman-generator'),
    astQuery = require('ast-query'),
    _ = require('lodash'),
    dirOrFilePath;

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
        var pathArray = dirOrFilePath.split('/').reverse();
        var dirOrFileName = pathArray[0];
        var componentType;
        if (pathArray.indexOf('controllers') > -1) {
            componentType = 'controller';
        } else if (pathArray.indexOf('directives') > -1) {
            componentType = 'directive';
        }
        var fileString = parseEngine.loadAndParseFile(this.fs, dirOrFilePath);
        var filename = dirOrFileName.replace('.js', '');
        var tree = astQuery(fileString);
        var moduleName = parseEngine.getNgModuleName(tree);

        this.fs.copyTpl(
            this.templatePath(componentType + '.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename,
                ngModule: moduleName,
                componentName: parseEngine.getTestableComponentName(fileString, componentType, moduleName),
                scopeVariables: parseEngine.getScopeVariables(fileString),
                scopeFunctions: parseEngine.getScopeVariables(fileString, true)
            }
        );
    }
});
