const pkgJson = require("./package.json");
const webpack = require("szig-build-tool/webpack");
const copyProperties = require("szig-build-tool/lib/copyProperties");
const StatsReplacePlugin = require("stats-replace-webpack-plugin");

module.exports = {

    define: function (custom) {
        // clone object
        custom = JSON.parse(JSON.stringify(custom));

        const defines = copyProperties(custom, {
            PACKAGE_NAME: JSON.stringify(pkgJson.name),
            PACKAGE_VERSION: JSON.stringify(pkgJson.version)
        });

        Object.keys(defines).forEach((key) => (defines[key] = JSON.stringify(defines[key])));

        return new webpack.DefinePlugin(defines);
    },

    banner: function () {
        return new webpack.BannerPlugin(`${pkgJson.name} v${pkgJson.version} ${new Date().toISOString()}`, {
            entryOnly: true
        });
    },

    uglifyJS: function () {
        return new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                drop_console: true
            }
        });
    }
};
