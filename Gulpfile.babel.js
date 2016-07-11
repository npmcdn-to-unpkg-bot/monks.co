import gulp from 'gulp'

import autoprefixer from 'autoprefixer'
import clean from 'gulp-clean'
import cloudfront from 'gulp-cloudfront-invalidate-aws-publish'
import cssimport from 'postcss-import'
import entities from 'gulp-html-entities'
import htmlmin from 'gulp-htmlmin'
import parallelize from 'concurrent-transform'
import postcss from 'gulp-postcss'
import prettify from 'gulp-jsbeautifier'
import publish from 'gulp-awspublish'
import shell from 'gulp-shell'
import typography from 'gulp-typogr'

gulp.task('clean', () => {
  return gulp.src(['./jekyll/_site', './target'], {read: false})
    .pipe(clean())
})

gulp.task('jekyll', ['clean'], shell.task([
  './jekyll.sh'
]))

gulp.task('copy', ['jekyll'], () => {
  return gulp.src('./jekyll/_site/**/*')
    .pipe(gulp.dest('./target'))
})

gulp.task('resources', ['copy'], () => {
  return gulp.src('./resources/**/*')
    .pipe(gulp.dest('./target'))
})

gulp.task('finalize', ['copy'], () => {
  return gulp.src('./target/node_modules', {read: false})
    .pipe(clean())
})

gulp.task('css', ['copy'], () => {
  const processors = [
    cssimport({ from: './target/css/style.css' }),
    autoprefixer({ browsers: ['last 1 version'] })
  ]
  return gulp.src('./target/css/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./target/css'))
})

gulp.task('html', ['copy'], () => {
  return gulp.src('./target/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(typography())
    // .pipe(entities('decode'))
    .pipe(prettify({
      preserve_newlines: false,
      indent_size: 2
    }))
    .pipe(gulp.dest('./target'))
})

gulp.task('build', ['html', 'css', 'resources', 'finalize'])

gulp.task('publish', ['build'], () => {
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

gulp.task('default', ['publish'])

