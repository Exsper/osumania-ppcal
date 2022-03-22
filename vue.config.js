const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  outputDir: "./docs/",
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      require("unplugin-element-plus/webpack")({
        // options
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "osu!mania pp计算器";
      return args;
    });
  },
});
