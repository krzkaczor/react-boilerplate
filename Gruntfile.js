module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    livereload: true,
                    keepalive: true,
                    base: 'dist',
                    open: true
                }
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [["babelify",
                        {
                            stage: 0,
                            extensions: ['.js', '.jsx']
                        }
                    ]],
                    browserifyOptions: {
                        extensions: ['.jsx'],
                        debug: true
                    },
                    watch: true,
                    keepAlive: true
                },
                files: {
                    "dist/bundle.js": "src/app.jsx"
                }
            }
        },
        concurrent: {
            develop: ['connect', 'browserify', 'watch']
        },
        htmlmin: {
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "src/",
                    "src": ["**/*.html"],
                    "dest": "dist/",
                    "ext": ".html"
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'dist/**/*.js'
                ],
                tasks: ['connect']
            }
        },
        copy: {
            bower_components: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'components/**'
                        ],
                        dest: 'dist'
                    }
                ]
            }
        },
        wiredep: {
            dist: {
                src: [
                    'src/index.html'
                ]
            }
        },
        less: {
            development: {
                files: {
                    "dist/styles.css":["src/styles/*.less"]
                }
            }
        }
    });

    grunt.registerTask("build", ["wiredep", "htmlmin", "copy", "less", "concurrent:develop"]);
    grunt.registerTask("serve", ["build"]);

};