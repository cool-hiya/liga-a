'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            style: {
                files: {
                    'build/css/style.css': 'src/sass/style.scss'
                }
            }
        },

        postcss: {
            style: {
                options: {
                    processors: [
                        require("autoprefixer")()
                    ]
                },
                src: 'build/css/style.css'
            }
        },

        csso: {
            compress: {
                options: {
                    report: 'gzip'
                },
                files: {
                    'build/css/style.min.css': ['build/css/style.css']
                }
            }
        },

        uglify: {
            compress: {
                files: {
                    'build/js/script.min.js': ['src/js/*.js']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },

        svgstore: {
            options: {
                includeTitleElement: false,

            },
            sprite: {
                files: {
                    'build/img/sprite.svg': ['src/img/icons/*.svg']
                }
            },
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        'fonts/**/*.{woff,woff2}',
                        'js/ie/*.js',
                        'img/favicon.ico'
                    ],
                    dest: 'build'
                }]
            }
        },

        clean: {
            build: ['build']
        },

        browserSync: {
            server: {
                bsFiles: {
                    src: [
                        'build/*.html',
                        'build/css/*.css'
                    ]
                },
                options: {
                    server: 'build/',
                    watchTask: true,
                    notify: false,
                    open: true,
                    cors: true,
                    ui: false
                }
            }
        },

        watch: {
            style: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass", "postcss", "csso']
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            },
            markup: {
                files: ['src/*.html'],
                tasks: ['htmlmin']
            }
        }
    });

    grunt.registerTask('serve', ['browserSync', 'watch']);
    grunt.registerTask('build', ["clean", 'copy', 'htmlmin', 'sass', 'postcss', 'csso', 'uglify', 'svgstore']);
};