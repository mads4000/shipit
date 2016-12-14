const path = require("path");
const cp = require("szig-build-tool/lib/copyProperties");
const webpack = require("szig-build-tool/webpack");
const webpackPlugins = require("./webpack.plugins");
const buildEnv = require("szig-build-tool/lib/env");
const loader = webpack.loaders;

buildEnv.registerEnv("EMBED", {
    type: "boolean",
    "default": false
});

const env = buildEnv.compile();
const projectData = require("./data/project")(env);


module.exports = cp({

    devtool: env.PRODUCTION ? null : "#cheap-module-source-map",

    entry: {
        main: ["fetch-polyfill", "./app/src/index.js"]
    },

    output: {
        path: path.join(__dirname, "..", "public"),
        filename: "[name].js",
        pathinfo: !env.PRODUCTION,
        publicPath: ""
    },

    module: {
        loaders: [
            {
                loader: "babel-loader",
                query: {
                    cacheDirectory: ".cache"
                },
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                loaders: [
                    `${loader.file}?${JSON.stringify({
                        name: "[name].html"
                    })}`,
                    loader.extract,
                    loader.html,
                    loader.htmlImageSize,
                    loader.handlebarsRender
                ],
                test: path.join(__dirname, "app", "src", "index.hbs")
            },
            {
                loaders: [
                    loader.html,
                    loader.htmlImageSize,
                    loader.handlebarsRender
                ],
                test: /.*\.hbs$/,
                exclude: path.join(__dirname, "app", "src", "index.hbs")
            },
            {
                loader: loader.html,
                test: /\.html$/
            },
            {
                loaders: [
                    `${loader.file}?${JSON.stringify({
                        name: "main.css"
                    })}`,
                    loader.extract,
                    `${loader.css}?${JSON.stringify({
                        autoprefixer: false,
                        mergeRules: false,
                        sourceMap: true
                    })}`,
                    loader.postcss,
                    loader.sass,
                    loader.macro
                ],
                test: path.join(__dirname, "app", "src", "index.scss")
            },
            {
                loaders: [
                    loader.style,
                    `${loader.css}?${JSON.stringify({
                        autoprefixer: false,
                        mergeRules: false,
                        sourceMap: true
                    })}`,
                    loader.postcss,
                    loader.sass,
                    loader.macro
                ],
                test: /\.scss/,
                exclude: path.join(__dirname, "app", "src", "index.scss")
            },
            {
                loader: loader.file,
                query: {
                    name: "[name].[ext]"
                },
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff\d?$|\.ttf$|\.eot|\.otf|\.wav$|\.mp3$/
            },
            {
                loader: loader.json,
                test: /\.json$/
            }
        ]
    },

    macroLoader: cp({
        macros: env
    }),

    handlebarsRenderLoader: cp({
        data: projectData,
        partials: [
            path.join(__dirname, "lib", "partials", "*.hbs")
        ]
    }, webpack.baseConfig.handlebarsRenderLoader),

    plugins: [
        webpackPlugins.banner(),
        webpackPlugins.define(env)
    // !UGLIFY NOT EXECUTED?
    ].concat(env.PRODUCTION ? [webpackPlugins.uglifyJS()] : [])

}, webpack.baseConfig);
