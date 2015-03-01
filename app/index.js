var generators = require('yeoman-generator');
var astQuery = require('ast-query');
var dirOrFilePath;

var loadAndParseFile = function(that) {
    //if (fs.existsSync(filename))
    var fileString = that.fs.read(dirOrFilePath);
    return fileString;
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

var getTestableComponentName = function(fileString, componentType) {
    //for detailed regex explanation see https://regex101.com/.
    var regex = /angular.module\(['"]eikyoApp['"]\).controller\(['"](.+)'/
    var ngComponent = regex.exec(fileString);
    var componentName;
    try{
        componentName = ngComponent[1];
    }catch(err){
        componentName = "#testEntityName#"
    }
    return componentName;
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
            dirOrFilePath = answers.dirOrFile.trim();
            done();
        }.bind(this));
    },

    writing: function() {
        var dirOrFileName = dirOrFilePath.split('/').reverse()[0];
        var filename = dirOrFileName.replace('.js', '');
        var fileString = loadAndParseFile(this);

        var tree = astQuery(fileString);
        //Replace all white space character, including space, tab, form feed, line feed
        fileString = fileString.replace(/\s/g, "");

        var ngModule = getNgModuleName(tree);
        var componentName = getTestableComponentName(fileString, 'controller');

        this.fs.copyTpl(
            this.templatePath('controllerTest.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename,
                ngModule: ngModule,
                componentName: componentName
            }
        );
    }
});
