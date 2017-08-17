'use strict';
const yeoman = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const packageJSON = require('../../package.json');
const utils = require('./utils/misc');

const CONFIG = require('./templates/config');
const boilerplatesMap = CONFIG.boilerplatesMap;

module.exports = yeoman.Base.extend({
    /*
    * 初始化时调用
    * */
    initializing: function () {
        this.props = {};

    },

    /*
    *
    * 配置各种选项
    *
    * */
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the sweet ' + chalk.red('generator-vue-stack') + ' generator!'
        ));
        let allBoilerplates=_.keys(boilerplatesMap);
        var prompts = [
            {
                name: 'boilerplate',
                type: 'list',
                choices: allBoilerplates,
                default: allBoilerplates[0],
                message: 'boilerplate'
            }, {
                name: 'name',
                message: 'Your project name',
                default: path.basename(process.cwd())// Default to current folder name
            }, {
                name: 'version',
                default: '0.1.0',
                message: 'version'
            },
            {
                name: 'description',
                default: 'vue project',
                message: 'description'
            },
            {
                name: 'repo',
                default: utils.getGitOrigin(),
                message: 'git repository'
            },
            {
                name: 'keywords',
                default: 'vue',
                message: 'keywords',
                filter: function (words) {
                    return words.split(/\s*,\s*/g);
                }
            },
            {
                name: 'author',
                default: this.user.git.name(),
                message: 'author'
            },
            {
                name: 'email',
                default: this.user.git.email(),
                message: 'E-Mail'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someAnswer;

            done();
        }.bind(this));
    },

    /*
     * 生成 LICENSE
     *
     * */
    default: function () {
        this.composeWith('license', {
            options: {
                name: this.props.author,
                email: this.props.email,
                website: ''
            }
        }, {
            local: require.resolve('generator-license/app')
        });

    },
    writing: {
        "init":function () {
            this.currentDir = boilerplatesMap[this.props.boilerplate] || _.keys(boilerplatesMap)[0];
        },

        /*
         * 生成 package.json
         *
         * */
        "package_json": function () {
            var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

            var pkg_json={
                "webpack1+vue1": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                		"babel-core": "^6.4.5",
                		"babel-loader": "^6.2.1",
                		"babel-preset-es2015": "^6.3.13",
                		"vue-loader": "^8.2.1",
                		"babel-plugin-transform-runtime": "^6.0.0",
                		"babel-preset-stage-0": "^6.5.0",
                		"css-loader": "^0.23.1",
                		"extract-text-webpack-plugin": "^1.0.1",
                		"file-loader": "^0.8.5",
                		"json-loader": "^0.5.4",
                		"less": "^2.5.3",
                		"less-loader": "^2.2.2",
                		"open": "0.0.5",
                		"postcss-initial": "^1.5.1",
                		"postcss-loader": "^0.8.0",
                		"style-loader": "^0.13.0",
                		"vue-html-loader": "^1.0.0",
                		"vue-style-loader": "^1.0.0",
                		"vue-hot-reload-api": "^1.2.0",
                		"clean-webpack-plugin": "^0.1.15",
                		"copy-webpack-plugin": "^4.0.1",
                		"url-loader": "^0.5.7",
                		"webpack": "^1.12.14",
                		"webpack-dev-server": "^1.14.1"
                    },
                    dependencies:{
                		"vue": "^1.0.0"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack1+vue2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                		"babel-core": "^6.4.5",
                		"babel-loader": "^6.2.1",
                		"babel-plugin-transform-runtime": "^6.0.0",
                		"babel-preset-es2015": "^6.0.0",
                		"babel-preset-stage-0": "^6.5.0",
                		"vue-loader": "^10.0.2",
                		"css-loader": "^0.23.1",
                		"extract-text-webpack-plugin": "^1.0.1",
                		"file-loader": "^0.8.4",
                		"json-loader": "^0.5.4",
                		"less": "^2.7.1",
                		"less-loader": "^2.2.3",
                		"open": "0.0.5",
                		"postcss-initial": "^1.5.1",
                		"postcss-loader": "^0.9.1",
                		"style-loader": "^0.13.1",
                		"url-loader": "^0.5.7",
                		"vue-template-compiler": "2.2.1",
                		"clean-webpack-plugin": "^0.1.15",
                		"copy-webpack-plugin": "^4.0.1",
                		"webpack": "^1.12.14",
                		"webpack-dev-server": "^1.14.1"
                    },
                    dependencies:{
                		"vue": "2.2.1"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack2+vue2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-core": "^6.4.5",
                        "babel-loader": "^6.2.1",
                        "babel-plugin-transform-runtime": "^6.0.0",
                        "babel-preset-es2015": "^6.0.0",
                        "babel-preset-stage-0": "^6.5.0",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^2.1.0",
                        "file-loader": "^0.8.4",
                        "json-loader": "^0.5.4",
                        "less": "^2.7.1",
                        "less-loader": "^2.2.3",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.9.1",
                        "style-loader": "^0.16.0",
                        "url-loader": "^0.5.7",
                        "vue-loader": "^11.2.0",
                        "vue-template-compiler": "2.2.1",
                        "webpack": "^2.3.1",
                        "webpack-dev-server": "^2.4.2"
                    },
                    dependencies:{
                		"vue": "2.2.1"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack2+vue2+vuex2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-core": "^6.4.5",
                        "babel-loader": "^6.2.1",
                        "babel-plugin-transform-runtime": "^6.0.0",
                        "babel-preset-es2015": "^6.0.0",
                        "babel-preset-stage-0": "^6.5.0",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^2.1.0",
                        "file-loader": "^0.8.4",
                        "json-loader": "^0.5.4",
                        "less": "^2.7.1",
                        "less-loader": "^2.2.3",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.9.1",
                        "style-loader": "^0.16.0",
                        "url-loader": "^0.5.7",
                        "vue-loader": "^11.2.0",
                        "vue-template-compiler": "2.2.1",
                        "webpack": "^2.3.1",
                        "webpack-dev-server": "^2.4.2"
                    },
                    dependencies:{
                        "es6-promise": "^4.1.0",
                		"vue": "2.2.1",
                        "vuex": "2.2.1"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack2+vue2+vuex2+vue-router2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-core": "^6.4.5",
                        "babel-loader": "^6.2.1",
                        "babel-plugin-transform-runtime": "^6.0.0",
                        "babel-preset-es2015": "^6.0.0",
                        "babel-preset-stage-0": "^6.5.0",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^2.1.0",
                        "file-loader": "^0.8.4",
                        "json-loader": "^0.5.4",
                        "less": "^2.7.1",
                        "less-loader": "^2.2.3",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.9.1",
                        "style-loader": "^0.16.0",
                        "url-loader": "^0.5.7",
                        "vue-loader": "^11.2.0",
                        "vue-template-compiler": "2.2.1",
                        "webpack": "^2.3.1",
                        "webpack-dev-server": "^2.4.2"
                    },
                    dependencies:{
                        "es6-promise": "^4.1.0",
                        "vue": "2.2.1",
                        "vuex": "2.2.1",
                        "vue-router": "2.5.2",
                        "whatwg-fetch": "^2.0.3",
                        "qs": "^6.4.0"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack2+happypack+vue2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-core": "^6.4.5",
                        "babel-loader": "^6.2.1",
                        "babel-plugin-transform-runtime": "^6.0.0",
                        "babel-preset-es2015": "^6.0.0",
                        "babel-preset-stage-0": "^6.5.0",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^2.1.0",
                        "file-loader": "^0.8.4",
                        "happypack": "^3.0.3",
                        "json-loader": "^0.5.4",
                        "less": "^2.7.1",
                        "less-loader": "^2.2.3",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.9.1",
                        "style-loader": "^0.16.0",
                        "url-loader": "^0.5.7",
                        "vue-loader": "^11.2.0",
                        "vue-template-compiler": "2.2.1",
                        "webpack": "^2.3.1",
                        "webpack-dev-server": "^2.4.2"
                    },
                    dependencies:{
                		"vue": "2.2.1"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack2+happypack+vue2+vuex2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-core": "^6.4.5",
                        "babel-loader": "^6.2.1",
                        "babel-plugin-transform-runtime": "^6.0.0",
                        "babel-preset-es2015": "^6.0.0",
                        "babel-preset-stage-0": "^6.5.0",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^2.1.0",
                        "file-loader": "^0.8.4",
                        "happypack": "^3.0.3",
                        "json-loader": "^0.5.4",
                        "less": "^2.7.1",
                        "less-loader": "^2.2.3",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.9.1",
                        "style-loader": "^0.16.0",
                        "url-loader": "^0.5.7",
                        "vue-loader": "^11.2.0",
                        "vue-template-compiler": "2.2.1",
                        "webpack": "^2.3.1",
                        "webpack-dev-server": "^2.4.2"
                    },
                    dependencies:{
                        "es6-promise": "^4.1.0",
                		"vue": "2.2.1",
                        "vuex": "2.2.1"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack2+happypack+vue2+vuex2+vue-router2": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-core": "^6.4.5",
                        "babel-loader": "^6.2.1",
                        "babel-plugin-transform-runtime": "^6.0.0",
                        "babel-preset-es2015": "^6.0.0",
                        "babel-preset-stage-0": "^6.5.0",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^2.1.0",
                        "file-loader": "^0.8.4",
                        "happypack": "^3.0.3",
                        "json-loader": "^0.5.4",
                        "less": "^2.7.1",
                        "less-loader": "^2.2.3",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.9.1",
                        "style-loader": "^0.16.0",
                        "url-loader": "^0.5.7",
                        "vue-loader": "^11.2.0",
                        "vue-template-compiler": "2.2.1",
                        "webpack": "^2.3.1",
                        "webpack-dev-server": "^2.4.2"
                    },
                    dependencies:{
                        "es6-promise": "^4.1.0",
                        "vue": "2.2.1",
                        "vuex": "2.2.1",
                        "vue-router": "2.5.2",
                        "whatwg-fetch": "^2.0.3",
                        "qs": "^6.4.0"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                }
            }[this.props.boilerplate]||{};

            this.pkg = extend({
                name: _.kebabCase(this.props.name),
                version: this.props.version,
                description: this.props.description,
                repository: {
                    type: 'git',
                    url: this.props.repo,
                },
                author: {
                    name: this.props.author,
                    email: this.props.email
                },
                keywords: [],
                "dependencies": pkg_json.dependencies||{},
                "devDependencies": pkg_json.devDependencies||{},
                "scripts":pkg_json.scripts||{},
                "bugs": {
                    "url": "http://" + utils.getHomeUrl(this.props.repo) + "/issues"
                },
                "homepage": "http://" + utils.getHomeUrl(this.props.repo)
            }, currentPkg);

            // Combine the keywords
            if (this.props.keywords) {
                this.pkg.keywords = _.uniq(this.props.keywords.concat(this.pkg.keywords));
            }

            // Let's extend package.json so we're not overwriting user previous fields
            this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
        },
        /*
         * 生成 README.md
         *
         * */
        "directories": function () {
            this.fs.copy(this.templatePath('./' + this.currentDir + '/static') + "/gitignore", this.destinationPath('./.gitignore'));
            this.fs.copy(this.templatePath('./' + this.currentDir + '/static') + "/babelrc", this.destinationPath('./.babelrc'));
            this.fs.copy(this.templatePath('./' + this.currentDir + '/static') + "/**/*.*", this.destinationPath('./'));
            this.fs.copyTpl(this.templatePath('./' + this.currentDir + '/tpl') + "/**/*.*", this.destinationPath('./'), {AppName: this.pkg.name});
        }

    },

    install: function () {
        let opt = {
            cwd: this.destinationPath('./')
        };
        switch (this.props.boilerplate) {
            case 'webpack1+vue1':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack1+vue2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack2+vue2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack2+vue2+vuex2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack2+vue2+vuex2+vue-router2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack2+happypack+vue2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack2+happypack+vue2+vuex2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack2+happypack+vue2+vuex2+vue-router2':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            default:
                break;
        }
    }
});
