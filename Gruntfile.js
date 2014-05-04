var fs = require('fs');
var path = require('path');

var config = {
  icons: {
    src:      "source/fonts/svg/*.svg",
    fontDest: "source/fonts/",
    sassDest: "source/stylesheets/lib/variables/_icon-glyphs.css.sass"
  },
  sprites: {
    src: "source/images/sprites/*.png",
    imageDest: "source/images/sprites.png",
    sassDest: "source/stylesheets/lib/variables/_sprites.css.sass"
  }
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webfont: {
      icons: {
        src: config.icons.src,
        dest: config.icons.fontDest,
        destCss: path.dirname(config.icons.sassDest),
        options: {
          hashes: false,
          relativeFontPath: '',
          htmlDemo: false,
          font: 'icons',
          template: './.icon-glyphs-template.css',
          types: ['eot', 'woff', 'ttf']
        },
      }
    },
    sprite: {
      all: {
        src: config.sprites.src,
        destImg: config.sprites.imageDest,
        destCSS: config.sprites.sassDest,
        cssTemplate: './.sprites-template.css',
      }
    },
    moveIconsSassFile: {}
  });

  grunt.registerTask('moveIconsSassFile', 'Fix generated name', function() {
    fs.rename(
      path.join(path.dirname(config.icons.sassDest), 'icons.css'),
      config.icons.sassDest
    );
  });

  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('default', ['webfont', 'moveIconsSassFile', 'sprite']);
};

