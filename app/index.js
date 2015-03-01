var generators = require('yeoman-generator');
var dirOrFilePath;

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

        this.fs.copyTpl(
            this.templatePath('controllerTest.js'),
            this.destinationPath(filename + '.js'), {
                fileName: filename
            }
        );
    }
});
