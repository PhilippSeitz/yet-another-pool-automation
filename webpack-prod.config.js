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
          plugins: () => [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
            purgecss({
              content: ['./**/*.html'],
              defaultExtractor: content =>
                content.match(/[\w-/:]+(?<!:)/g) || []
            })
          ]
        }
      }
    ]
  }
};
