const devCerts = require('office-addin-dev-certs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { resolve } = require('path')

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions()
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert }
}

module.exports = async (env, options) => {
  const isDev = process.env.NODE_ENV === 'development'
  const envFile = isDev ? '.development.env' : '.production.env'
  const envPath = resolve(__dirname, envFile)
  const envVars = require('dotenv').config({ path: envPath }).parsed || {}
  return {
    devtool: 'source-map',
    entry: {
      polyfill: ['core-js/stable', 'regenerator-runtime/runtime'],
      vendor: ['react', 'react-dom', 'core-js'],
      taskpane: ['react-hot-loader/patch', './src/taskpane/index.tsx', './src/taskpane/taskpane.html'],
      login: './src/auth/login/login.ts'
    },
    optimization: {
      runtimeChunk: 'single'
    },
    output: {
      clean: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.html', '.js'],
      alias: {
        '@components': resolve(__dirname, './src/taskpane/components'),
        '@utils': resolve(__dirname, './src/taskpane/utils'),
        '@interfaces': resolve(__dirname, './src/taskpane/interfaces')
      }
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2015'
          }
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'html-loader'
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext][query]'
          }
        },
        {
          test: /\.(sass|less|css)$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(xlsx|csv)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'assets/*',
            to: 'assets/[name][ext][query]'
          },
          {
            from: 'manifest*.xml',
            to: '[name]' + '[ext]'
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: 'taskpane.html',
        template: './src/taskpane/taskpane.html',
        chunks: ['polyfill', 'vendor', 'taskpane', 'functions']
      }),
      new HtmlWebpackPlugin({
        filename: 'login.html',
        template: './src/auth/login/login.html',
        chunks: 'login',
        excludeChunks: ['vendor', 'taskpane', 'dialog']
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars)
      }),
    ],
    devServer: {
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      server: {
        type: 'https',
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions()
      },
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  }
}
