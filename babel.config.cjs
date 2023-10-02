const config = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [['replace-import-extension', { extMapping: { '.js': '' } }]],
};

module.exports = config;
