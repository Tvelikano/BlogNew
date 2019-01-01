const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/Index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/public",
  },
  watch: true,
  devtool: "source-map",
  resolve: {
    modules: ["Src", "node_modules"],
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
