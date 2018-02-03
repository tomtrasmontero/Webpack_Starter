const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // define source map
  devtool: 'cheap-module-eval-source-map',
  // define where the starting file is located
  entry: './src/index.js',
  output: {
    // where the assets will be stored. root directory name and append a dist folder
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // to support lazy loading
    chunkFilename: '[id].js',
    // store file in root folder so its empty
    publicPath: ''
  },
  resolve: {
    // if there is a missing extensions, webpack will try these extensions
    extensions: ['.js', '.jsx']
  },
  // handle different file types
  module: {
    rules: [
      {
        // test a file, if it meets a certain criteria and process accordingly
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude node_modules from webpack
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        test:/\.(png|jpe?g|gif)$/,
        // limit file size
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  // connect webpack to the html file
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    })
  ]
};
