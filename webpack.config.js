const webpack = require("webpack");
const merge = require("webpack-merge");

module.exports = [
  merge(require("./webpack.base"), {
    entry: "./src/plugin.js",
    output: {
      filename: "vue-compactable.js",
      library: "VueCompactable",
      libraryTarget: "window"
    }
  }),
  merge(require("./webpack.base"), {
    entry: "./src/compactable.vue",
    output: {
      filename: "vue-compactable.min.js",
      library: "vuecompactable",
      libraryTarget: "umd",
      umdNamedDefine: true
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.js$/,
        minimize: true
      })
    ]
  })
];
