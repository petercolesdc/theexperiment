const path = require('path')

// test merge
module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/dist',
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: [
            "es2015",
            "stage-2",
            "react"
          ].map(dep => require.resolve(`babel-preset-${dep}`)),
          plugins: [
            "transform-runtime"
          ].map(dep => require.resolve(`babel-plugin-${dep}`)),
          env: {
            development: {
              plugins: [
                ["react-transform", {
                  "transforms": [{
                    "transform": "react-transform-hmr",
                    "imports": ["react"],
                    "locals": ["module"]
                  }, {
                    "transform": "react-transform-catch-errors",
                    "imports": ["react", "redbox-react"]
                  }]
                }]
              ]
            }
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]   
  }
};
