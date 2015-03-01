var generators = require('yeoman-generator');
var dirOrFile;

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'dirOrFile',
            message: 'Directory or File name',
            default: this.appname
        }, function(answers) {
            dirOrFile = answers.dirOrFile;
            done();
        }.bind(this));
    },

    writing: function() {
        console.log('called place ' + dirOrFile);
        this.fs.copyTpl(
            this.templatePath('dummyTest.js'),
            this.destinationPath(dirOrFile + '.js'), {
                title: 'Templating with Yeoman'
            }
        );
    }
});
