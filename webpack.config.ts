import WebpackBar from "webpackbar";
import { merge } from "webpack-merge";
import globby from "globby";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import nodeExternals from "webpack-node-externals";

const isProduction = process.env["NODE_ENV"] === "production";
const isWatch = Boolean(process.env["WEBPACK_WATCH"]);

const base: webpack.Configuration = {
  watch: isWatch,
  mode: isProduction ? "production" : "development",
  devtool: "cheap-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
};

const makeBrowserConfig = (name: string): webpack.Configuration => {
  const entry: webpack.Entry = {};
  const files = globby.sync(`./src/browser/*.tsx`);
  for (const file of files) {
    entry[path.basename(file, ".tsx")] = file;
  }

  return merge(base, {
    entry,
    output: {
      path: path.resolve(__dirname, `dist/${name}`),
      filename: "assets/[name].js",
      publicPath: "",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                configFile: path.resolve(
                  __dirname,
                  "src/browser/tsconfig.json"
                ),
              },
            },
          ],
        },
        {
          test: /\.(png|woff2?|webm|gif|svg)$/,
          loader: "file-loader",
          options: { name: "assets/[name].[hash].[ext]" },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  exportLocalsConvention: "camelCase",
                },
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      ...Object.keys(entry).map(
        (entryName) =>
          new HtmlPlugin({
            filename: `${entryName}.html`,
            chunks: [entryName],
            template: `webpack/index.html`,
          })
      ),
      new MiniCssExtractPlugin({
        filename: "assets/[name].css",
        chunkFilename: "assets/[id].css",
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: "static",
        reportFilename: path.resolve(__dirname, `bundle-analyzer/index.html`),
      }),
      ...(isWatch ? [] : [new WebpackBar({ name })]),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          common: { minChunks: files.length },
          vendors: false,
          default: false,
        },
      },
    },
  });
};

const extensionConfig = merge(base, {
  target: "node",
  node: false,
  entry: path.resolve(__dirname, "src/server/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: path.resolve(__dirname, "src/server/tsconfig.json"),
        },
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [...(isWatch ? [] : [new WebpackBar({ name: "server" })])],
});

const config: webpack.Configuration[] = [
  makeBrowserConfig("browser"),
  extensionConfig,
];

export default config;
