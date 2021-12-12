const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production';

const HTMLPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'public', 'index.html'),
  filename: 'index.html',
  chunks: ['main'],
  inject: 'body',
  scriptLoading: 'module',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
  },
})

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
})

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsConfigPathsPlugin()],
    fallback: {
      fs: false,
      path: false,
      os: false,
      module: false,
      util: false,
    },
  },
  output: {
    module: true,
    asyncChunks: true,
    chunkFormat: 'module',
    chunkLoading: 'import',
    clean: true,
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    static: './static',
    historyApiFallback: true,
    open: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: dev
    ? [HTMLPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [HTMLPluginConfig, DefinePluginConfig],
  mode: dev ? 'development' : 'production',
  experiments: {
    outputModule: true,
  },
}
