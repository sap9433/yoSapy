var generators = require('yeoman-generator');
var programme = require('ast-query');
var dirOrFilePath;

var loadAndParseFile = function(that) {
    //if (fs.existsSync(filename))
    var file = that.fs.read(dirOrFilePath);
    var tree = programme(file);
    return tree;
}

var getNgModuleName = function(tree) {
    var ngModule;
    try {
        var expressions = tree.callExpression('angular.module');
        var firstExpression = expressions.nodes[0];
        var firstArgument = firstExpression.arguments[0];
        ngModule = firstArgument.value;
    } catch (err) {
        ngModule = '#ngModuleName#'
    }
    return ngModule;
}

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'dirOrFile',
            message: 'Directory or File name',
            default: this.appname
        }, function(answers) {
            dirOrFilePath = answers.dirOrFile;
            done();
        }.bind(this));
    },

    writing: function() {
        var dirOrFileName = dirOrFilePath.split('/').reverse()[0];
        var filename = dirOrFileName.replace('.js', '');
        debugger
        var tree = loadAndParseFile(this);
        var ngModule = getNgModuleName(tree);

        this.fs.copyTpl(
            this.templatePath('controllerTest.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename,
                ngModule: ngModule
            }
        );
    }
});
