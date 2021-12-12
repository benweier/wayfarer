const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production';

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

// const CSSExtractConfig = new MiniCssExtractPlugin({
//   filename: '[name].[chunkhash].css',
//   chunkFilename: '[id].css',
//   experimentalUseImportModule: true,
// })

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
    moduleIds: 'deterministic',
    runtimeChunk: false,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 200000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncSize: 200000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          priority: -10,
          reuseExistingChunk: true,
          usedExports: true
        },
        // vendors: {
        //   name: 'vendors',
        //   chunks: 'all',
        //   test: /node_modules/,
        //   priority: -10,
        //   reuseExistingChunk: true,
        //   usedExports: true,
        // },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          usedExports: true,
        },
      },
    },
  },
  devServer: {
    compress: true,
    port: 8080,
    // http2: true,
    hot: true,
    static: './static',
    historyApiFallback: true,
    open: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // {
      //   test: /\.css$/i,
      //   use: [
      //     'style-loader',
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             [
      //               'postcss-preset-env',
      //               {
      //                 stage: 2,
      //               }
      //             ],
      //           ],
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(svg|ttf|woff|woff2|png|jpg|jpeg|gif|webm)$/i,
        type: 'asset',
      }
    ],
  },
  plugins: isProduction
    ? [HTMLPluginConfig, DefinePluginConfig]
    : [HTMLPluginConfig, new webpack.HotModuleReplacementPlugin()],
  mode: isProduction ? 'production' : 'development',
  experiments: {
    outputModule: true,
    layers: true,
  },
}
