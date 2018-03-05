const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loaders: ["babel-loader"],
        exclude: /node-modules/
      },
      {
        test: /\.vue$/,
        loaders: ["vue-loader"],
        exclude: /node-modeules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"]
  }
};
