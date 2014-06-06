module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            printcss: {
                files: [{
                    src: 'print/print.css',
                    dest: 'lib/print.css',
                }]
            }
        },
        concat: {
            css: {
                src: [
                    'css/*'
                ],
                dest: 'lib/css.css'
            },
            js: {
                src: [
                    'js/*'
                ],
                dest: 'lib/js.js'
            }
        },
        cssmin: {
            css: {
                src: 'lib/css.css',
                dest: 'lib/css.min.css'
            },
            printcss: {
                src: 'lib/print.css',
                dest: 'lib/print.min.css'
            }
        },

        uglify: {
            js: {
                files: {
                    'lib/js.min.js': ['lib/js.js']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['copy:printcss', 'concat:css', 'cssmin:css', 'cssmin:printcss', 'concat:js', 'uglify:js']);
};
