var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
var WebpackAutoInject = require('webpack-auto-inject-version');
const CopyPlugin = require('copy-webpack-plugin');
const lodashREpl=require('lodash-webpack-plugin');
module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {test : /\.(png|jpg|jpeg|gif|svg)$/,loader: 'file-loader'}
        ]
    },
    mode:'development',
    stats: 'normal',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 8079,
        hot:false,
        publicPath:'/',
        host: "0.0.0.0",
        disableHostCheck: true,
        watchOptions: {
            ignored: [
                path.resolve(__dirname, 'dist'),
                path.resolve(__dirname, 'package.json')
            ]
        }
    },
    plugins: [
        new lodashREpl(),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new CopyPlugin({
            patterns: [
             { from: 'app/images/media', to: 'assets' },
             { from: 'app/images/', to: 'images' }
        ]}),    
    ]
}

