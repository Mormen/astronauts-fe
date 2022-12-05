const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
require('dotenv').config({ path: './.env' })


module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    devServer: {
        port: process.env.PORT,
        host: "localhost",
        historyApiFallback: true,
        watchContentBase: true
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.bundle.js"
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src/"),
            store: path.resolve(__dirname, "src/store/"),
            myUtils: path.resolve(__dirname, "src/myUtils/")
        },
        extensions: [".tsx", ".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/assets/index.html",
                publicPath: "/"
            }
        ),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        })
    ]
} 