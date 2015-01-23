'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var MsWebappGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('app_name', { type: String, required: false });
    this.appname = this.app_name || this.appname;
    this.appname = this._.classify(this.appname);

    this.config.defaults({
      appName: this.appname
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick MsWebapp generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('web');
      this.dest.mkdir('web/templates');
      this.dest.mkdir('web/js');
      this.dest.mkdir('web/css');
      this.dest.mkdir('web/css/img');
      this.dest.mkdir('web/images');
      this.dest.mkdir('web/fonts');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = MsWebappGenerator;
