const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [
    nodeExternals()
  ],
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  // node: false,
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { node: '10' }, useBuiltIns: 'usage', corejs: 3 }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'pug-loader'
          }
        ]
      },
      {
        test: /\.csv$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              emitFile: true
            }
          }
        ]
      }
    ]
  }
}
