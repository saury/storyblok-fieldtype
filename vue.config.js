module.exports = {
  configureWebpack: {
    externals: {
      vue: 'window.Storyblok.vue'
    },
    output: {
      filename: 'export.js'
    },
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    extract: false
  }
};
