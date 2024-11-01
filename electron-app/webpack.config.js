const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",  // Set to 'production' for production builds
  entry: {
    main: "./src/main.ts",  // Entry for Electron's main process
    preload: "./src/preload.ts"  // Entry for preload script, if you have one
  },
  target: "electron-main",
  externals: [nodeExternals()],  // Exclude native modules and other node modules
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "[name].js",  // '[name]' will output as 'main.js' for main.ts and 'preload.js' for preload.ts
    path: path.resolve(__dirname, "dist")  // Ensure output path is 'dist'
  }
};