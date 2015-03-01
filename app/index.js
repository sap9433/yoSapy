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
        this.fs.copyTpl(
            this.templatePath('dummyTest.js'),
            this.destinationPath(dirOrFileName + '.js'), {
                title: 'Templating with Yeoman'
            }
        );
    }
});
