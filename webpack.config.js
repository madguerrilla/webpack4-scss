'use strict';
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const mediaQueryPlugin = require('media-query-plugin');
const compressionPlugin = require('compression-webpack-plugin');
const devMode = /*process.env.NODE_ENV !== 'production' ||*/ false  ;

module.exports = {
    entry: './app.js',
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCSSAssetsPlugin(),
            new compressionPlugin({
                test: /\.(js|css)$/
            })
        ]
    },
    plugins: [
        new cleanWebpackPlugin('./dist'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default'],
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
        }),
        new styleLintPlugin({
            failOnError: false,
            configFile: '.stylelintrc.json'
        }),
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new mediaQueryPlugin({
            include: [
                'main'
            ],
            queries: {
                //Min bootstrap widths
                '(min-width: 1200px)': 'xl',
                '(min-width: 992px)': 'lg',
                '(min-width: 768px)': 'md',
                '(min-width: 576px)': 'sm',
                //Max bootstrap widths
                '(max-width: 1140px)': 'lg',
                '(max-width: 960px)': 'md',
                '(max-width: 720px)': 'sm',
                '(max-width: 540px)': 'xs'
            }

        })
    ],
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                devMode ? 'style-loader' : miniCssExtractPlugin.loader,
                'css-loader',
                // mediaQueryPlugin.loader,
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    }
}
