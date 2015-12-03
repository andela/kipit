var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, './app-frontend/app.jsx'),
    output: {
      path: path.resolve(__dirname, './public/build/'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {presets: ['es2015', 'react']}
        }
      ]
    }
};
