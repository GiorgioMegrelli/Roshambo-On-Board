const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const TS_CONFIG = "tsconfig.json";

const tsConfig = JSON.parse(
    fs.readFileSync(TS_CONFIG)
);
const buildDir = tsConfig["compilerOptions"]["outDir"];

module.exports = {
    entry: "./src/main.ts",
    cache: false,
    output: {
        filename: "source.js",
        path: path.resolve(__dirname, buildDir),
    },
    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: { comments: false },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./templates/index.html",
        }),
    ],
};
