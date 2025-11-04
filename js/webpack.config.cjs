const path = require('path');
const webpack = require('webpack');
const WrmPlugin = require('atlassian-webresource-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {DuplicatesPlugin} = require('inspectpack/plugin');
const {CompiledExtractPlugin} = require('@compiled/webpack-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WRM_DEPENDENCIES_CONFIG = require(`./wrm-dependencies.cjs`);

const PLUGIN_NAME = 'starter';
const PLUGIN_KEY = 'com.jira.plugins.jira-plugin-starter';
const MVN_OUTPUT_DIR = path.join(__dirname, '..', 'target', 'classes');
const FRONTEND_SRC_DIR = path.join(__dirname, 'src');
const BUNDLE_OUTPUT_DIR_NAME = 'webpack_bundles'; // directory which contains all build resources (bundles)
const FRONTEND_TARGET_DIR = path.join(MVN_OUTPUT_DIR, BUNDLE_OUTPUT_DIR_NAME); // jira target dir for bundle outputs

const config = {
    target: 'web',
    context: FRONTEND_SRC_DIR,
    entry: {
        'settings-app': [path.join(FRONTEND_SRC_DIR, 'settings-app', 'index.ts')],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: '@compiled/webpack-loader',
                        options: {
                            extract: true,
                        },
                    },
                ]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css', runtime: false}),
        new CompiledExtractPlugin({sortShorthand: true}),
        new WrmPlugin({
            pluginKey: PLUGIN_KEY,
            providedDependencies: WRM_DEPENDENCIES_CONFIG,
            verbose: false,
            contextMap: {},
            conditionMap: {},
            addAsyncNameAsContext: true,
            singleRuntimeWebResourceKey: 'ts_common-runtime',
            xmlDescriptors: path.resolve(MVN_OUTPUT_DIR, 'META-INF', 'plugin-descriptors', 'wr-webpack-bundles.xml'),
            locationPrefix: BUNDLE_OUTPUT_DIR_NAME,
        }),
        new WebpackBar(),
        new webpack.ProvidePlugin({
            // required by some @atlaskit components, but Webpack5 does not provide node.js polyfills anymore
            process: 'process/browser',
        }),
    ],
    externals: {
        JIRA: 'JIRA',
        AJS: {
            var: 'AJS',
        },
        'jquery': 'require("jquery")',
        'wrm/context-path': 'require("wrm/context-path")',
        'wrm/format': 'AJS.format',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        clean: true, // Clean the output directory before emit.
        path: path.resolve(FRONTEND_TARGET_DIR), // directory with all output files
        chunkLoadingGlobal: 'webpackChunk_' + PLUGIN_NAME
    },
    optimization: {
        // more info here: https://webpack.js.org/configuration/optimization/
        chunkIds: 'named',
        moduleIds: 'named',
        runtimeChunk: {
            name: 'manifest',
        },
        concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
            },
        },
    },
    ignoreWarnings: [
        /only default export is available soon/,
    ],
};


module.exports = (env, argv) => {
    config.mode = argv.mode;

    if (argv.mode === 'development') {
        config.watch = true;
        config.watchOptions = {
            aggregateTimeout: 500,
        };
        config.devtool = 'source-map';
    } else if (argv.mode === 'production') {
        config.devtool = undefined;
        if (argv.analyze) {
            // Here we go if now is: yarn analyze command running
            config.plugins.push(new DuplicatesPlugin()); // Shows package duplicates during build, if has any
            config.plugins.push(new BundleAnalyzerPlugin()); // Shows bundle sizes analysis results tree on http://127.0.0.1:8888/
        }
        config.plugins.push(new CleanWebpackPlugin());
        config.optimization.chunkIds = 'deterministic';
        config.optimization.moduleIds = 'deterministic';
    }

    config.optimization = {
        ...config.optimization,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: {
                        // Don't mangle usage of I18n.getText() function
                        reserved: ['I18n', 'getText'],
                    },
                },
            }),
        ],
    };

    return config;
};
