var merge = require('lodash.merge');
var webpack = require('webpack');
var path = require('path');
var webpackStatsHelper = require('./webpack-stats-helper');
var url = require('url');
var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

module.exports = function (options) {
    var defaultOptions = {
        hot: false,
        debug: false,
        optimize: false,
        saveStats: false,
        failOnError: false,
        host: '0.0.0.0',
        port: 3000,
        https: false,
        banner: false,
        dev: true
    };

    options = merge(defaultOptions, options || {});

    var entry = {
        app: path.join(__dirname, '../app/app.jsx')
    };

    var autoprefixerOptions = {
        browsers: [
            'ie >= 8',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ]
    };

    var banner =
        'Name: ' + pkg.name + '\n' +
        'Version: ' + pkg.version + '\n' +
        'Description: ' + pkg.description;

    var loaders = [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'react-hot-loader!babel-loader'
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.css$/,
            exclude: /(node_modules)/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.less$/,
            exclude: /(node_modules)/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }
    ];
    if (options.hash) {
        loaders.push({
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=[name]-[hash:6].[ext]'
        });
        loaders.push({
            test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
            loader: 'file-loader?name=[name]-[hash:6].[ext]'
        });
    } else {
        loaders.push({
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=[name].[ext]'
        });
        loaders.push({
            test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
            loader: 'file-loader?name=[name].[ext]'
        });
    }

    var plugins = [];


    plugins.push(new webpack.DefinePlugin({
        __DEV__: options.dev || false,
        __PRE_DEPLOY__: options.preDeploy || false
    }));

    if (options.dev) {
    }

    if (options.hot) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (!options.optimize) {
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }));
    } else {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }));
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }));
        plugins.push(new webpack.NoErrorsPlugin());
    }
    if (options.saveStats) {
        console.log('   WUJIANBO_LOG:   ', path.join(__dirname, '../dist/webpack.stats.json'));
        try{
            plugins.push(new webpackStatsHelper.saveToFile(path.join(__dirname, '../dist/webpack.stats.json')));
        }
        catch(err){
            console.log('at webpack-config.js   WUJIANBO_ERROR:     ',err);
        }
    }

    if (options.banner) {
        plugins.push(new webpack.BannerPlugin(banner));
    }

    var config = {
        entry: Object.keys(entry).reduce(function (result, key) {
            result[key] = options.hot ? [
                'webpack-dev-server/client?' + url.format({
                    hostname: options.host,
                    port: options.port,
                    protocol: options.https ? 'https' : 'http'
                }),
                'webpack/hot/dev-server',
                entry[key]
            ] : entry[key];
            return result;
        }, {}),
        output: {
            path: path.join(__dirname, '../dist'),
            filename: options.hash ? '[name]-[hash:6].js' : '[name].js',
            chunkFilename: options.hash ? '[name].[chunkhash].js' : '[name].chunk.js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['', '.jsx', '.js'],
            alias: {
                app: path.join(__dirname, '../app'),
                test: path.join(__dirname, '../test')
            }
        },
        module: {
            preLoaders: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: 'eslint-loader!babel-loader'
                }
            ],
            loaders: loaders
        },
        plugins: plugins,
        eslint: {
            configFile: path.join(__dirname, '../.eslintrc'),
            failOnError: options.failOnError,
            emitError: options.failOnError
        },
        postcss: function () {
            return [autoprefixer(autoprefixerOptions)];
        },
        node: {
            net: 'mock',
            dns: 'mock'
        },
        debug: options.debug
    };

    if (options.devTool) {
        config.devtool = options.devTool;
    }

    return config;
};