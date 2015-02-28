var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    writing: function() {
        console.log(this.sourceRoot());
        this.fs.copyTpl(
            this.templatePath('dummyTest.js'),
            this.destinationPath('ajeeb.js')
        );
    }
});
