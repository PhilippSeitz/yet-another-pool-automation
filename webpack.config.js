const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: () => {
            const plugins = [
              require('postcss-import'),
              require('postcss-nesting'),
              require('tailwindcss'),
              require('autoprefixer')
            ];
            if (process.env.PRODUCTION) {
              plugins.push(
                purgecss({
                  content: ['./**/*.html'],
                  defaultExtractor: content =>
                    content.match(/[\w-/:]+(?<!:)/g) || []
                })
              );
            }
            return plugins;
          }
        }
      }
    ]
  }
};
