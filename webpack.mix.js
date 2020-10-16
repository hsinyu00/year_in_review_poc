const mix = require('laravel-mix');
require('dotenv').config();

mix
  .setPublicPath('public')
mix.options({
  processCssUrls: false // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
});
mix.webpackConfig(() => ({
    resolve: {
      modules: ['src/js', 'node_modules'],
    },
  }))
  .js('src/js/app.js', 'public/js')
  .js('src/js/keyword.js', 'public/js')
  .js('src/js/keyword2.js', 'public/js')
  .js('src/js/tree.js', 'public/js')
  .sass('src/sass/app.scss', 'public/css')
  // .sass('src/sass/example.scss', 'public/css')
  .copyDirectory('src/icon', 'public/icon')
  .copyDirectory('src/images', 'public/images')
  .copyDirectory('src/video', 'public/video')
  .copyDirectory('src/fonts', 'public/fonts')
  .copy('node_modules/fullpage.js/dist/fullpage.min.js', 'public/vendor')
  .copy('node_modules/fullpage.js/dist/fullpage.min.css', 'public/vendor')

  // .sourceMaps()
  .browserSync(process.env.APP_URL);


/*
 |--------------------------------------------------------------------------
 | Production Mode
 |--------------------------------------------------------------------------
 */

if (mix.inProduction()) {
  mix
    .sourceMaps(false)
    .version()
    .options({
      terser: {
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      },
    });
}
