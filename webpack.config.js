const path = require('node:path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

dotenv.config({ silent: true })

const isProduction = process.env.NODE_ENV === 'production'

module.exports = () => {
  const plugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'SPACETRADERS_API_URL']),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: 'body',
      scriptLoading: 'module',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),
    new WebpackManifestPlugin(),
  ]

  if (!isProduction) {
    plugins.push(new ReactRefreshPlugin())
  }

  return {
    entry: './src/index.tsx',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
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
      module: isProduction,
      asyncChunks: true,
      chunkFormat: isProduction ? 'module' : 'array-push',
      chunkLoading: isProduction ? 'import' : 'jsonp',
      clean: true,
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[fullhash:8].[chunkhash:8].js',
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
          styles: {
            name: 'styles',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
          vendors: {
            test: /node_modules/,
            priority: -10,
            reuseExistingChunk: true,
            usedExports: true,
          },
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
      compress: false,
      port: 8080,
      hot: true,
      server: 'spdy',
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      open: true,
      // watchFiles: ['src/**/*.{js|ts|tsx}', 'public/index.html'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            // {
            //   loader: require.resolve(MiniCssExtractPlugin.loader),
            // },
            {
              loader: require.resolve('style-loader'),
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  ident: 'postcss',
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: { icon: true },
            },
          ],
        },
        {
          test: /\.svg$/i,
          type: 'asset',
        },
        {
          test: /\.(ttf|woff|woff2|png|jpg|jpeg|gif|webm)$/i,
          type: 'asset',
        },
      ],
    },
    plugins,
    experiments: {
      outputModule: isProduction,
      layers: true,
    },
  }
}
