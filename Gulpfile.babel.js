import gulp from 'gulp'

import autoprefixer from 'autoprefixer'
import checkPages from 'check-pages'
import clean from 'gulp-clean'
import cloudfront from 'gulp-cloudfront-invalidate-aws-publish'
import comments from 'postcss-discard-comments'
import cssimport from 'postcss-import'
import htmlmin from 'gulp-htmlmin'
import parallelize from 'concurrent-transform'
import postcss from 'gulp-postcss'
import postcssPrettify from 'postcss-prettify'
import prettify from 'gulp-jsbeautifier'
import publish from 'gulp-awspublish'
import sequence from 'gulp-sequence'
import serve from 'gulp-serve'
import shell from 'gulp-shell'
import typography from 'gulp-typogr'
import uncss from 'postcss-uncss'
import url from 'postcss-import-url'
import watch from 'gulp-sane-watch'

gulp.task('clean', () => {
  return gulp.src(['./jekyll/_site', './target'], {read: false})
    .pipe(clean())
})

gulp.task('jekyll', shell.task([
  './jekyll.sh'
]))

gulp.task('copy', ['jekyll'], () => {
  return gulp.src('./jekyll/_site/**/*')
    .pipe(gulp.dest('./target'))
})

gulp.task('resources', () => {
  return gulp.src('./resources/**/*')
    .pipe(gulp.dest('./target'))
})

gulp.task('watch-resources', () => {
  return watch('./resources/**/*', {debounce: 300}, () => {
    gulp.start('resources')
  })
})

gulp.task('css', ['html'], () => {
  const processors = [
    cssimport({ from: './target/css/style.css' }),
    url(),
    autoprefixer({ browsers: ['last 1 version'] })
  ]
  return gulp.src('./target/css/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./target/css'))
})

gulp.task('watch-css', () => {
  return watch('./jekyll/css/**/*', {debounce: 300}, () => {
    gulp.start('css')
  })
})

gulp.task('html', ['copy'], () => {
  return gulp.src('./target/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(typography())
    .pipe(prettify({
      preserve_newlines: false,
      indent_size: 2
    }))
    .pipe(gulp.dest('./target'))
})

gulp.task('watch-html', () => {
  return watch(['./jekyll/**/*.md', './jekyll/_posts/**/*', './jekyll/_layouts/**/*', './jekyll/_includes/**/*'], {debounce: 300}, () => {
    gulp.start('css')
  })
})

gulp.task('build', sequence('clean', ['resources', 'html', 'css']))

gulp.task('watch', sequence('build', ['watch-resources', 'watch-css', 'watch-html']))

gulp.task('serve', serve({
  root: ['target'],
  port: 1337
}))

gulp.task('default', ['watch', 'serve'])

gulp.task('optimize-css', ['build'], () => {
  const processors = [
    uncss({
      html: ['./target/**/*.html'],
      ignore: [/^\.grow.*/]
    }),
    comments({removeAll: true}),
    postcssPrettify
  ]
  return gulp.src('./target/css/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./target/css'))
})

gulp.task('optimize', ['optimize-css'])

gulp.task('serve-production', ['optimize', 'serve'])

gulp.task('test', ['serve-production'], (callback) => {
  const options = {
    pageUrls: [
      'http://localhost:1337'
    ],
    checkLinks: true,
    summary: true
  }
  checkPages(console, options, callback)
})

gulp.task('publish', ['optimize'], () => {
  const publisher = publish.create({
    region: 'us-east-1',
    params: {
      Bucket: 'monks.co'
    }
  })

  const cloudfrontSettings = {
    distribution: 'E3M3S8NDYQUE18',
    indexRootPaths: true
  }
  return gulp.src('./target/**/*')
    .pipe(parallelize(publisher.publish({
      'Cache-Control': 'max-age=315360000, no-transform, public'
    }), 10))
    .pipe(cloudfront(cloudfrontSettings))
    .pipe(publisher.cache())
    .pipe(publish.reporter())
})

