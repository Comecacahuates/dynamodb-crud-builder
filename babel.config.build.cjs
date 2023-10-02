const config = {
  presets: [['@babel/preset-env', { modules: 'cjs' }]],
  plugins: [['replace-import-extension', { extMapping: { '.js': '.cjs' } }]],
  sourceMaps: true,
};

module.exports = config;
