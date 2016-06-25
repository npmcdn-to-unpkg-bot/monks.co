import gulp from 'gulp'
import debug from 'gulp-debug'
import clean from 'gulp-clean'
import filelist from 'gulp-filelist'
import frontmatter from 'gulp-front-matter'
import markdown from 'gulp-markdown'
import layout from 'gulp-layout'
import typography from 'gulp-typogr'
import annotate from './lib/annotate'
import filter from 'gulp-filter'
import prettify from 'gulp-jsbeautifier'

const conf = {
  resource_paths: ['./resources/**/*'],
  output_dir: './target',
  object_paths: './objects/**/*'
}

gulp.task('clean', () => {
  return gulp.src(conf.output_dir, {read: false})
    .pipe(clean())
})

gulp.task('resources', ['clean'], () => {
  return gulp.src(conf.resource_paths)
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('annotate', ['clean'], () => {
  return gulp.src(conf.object_paths)
    .pipe(debug({title: 'annotating object'}))
    .pipe(frontmatter({
      property: 'frontmatter'
    }))
    .pipe(annotate({
      key: 'frontmatter',
      path: 'posts.json',
      filter: true
    }))
    .pipe(filter('posts.json'))
    .pipe(prettify())
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('posts', ['clean'], () => {
  return gulp.src(conf.object_paths)
    .pipe(debug({title: 'rendering object'}))
    .pipe(frontmatter({
      property: 'frontmatter'
    }))
    .pipe(markdown())
    .pipe(layout((file) => {
      return Object.assign({}, file.frontmatter, {
        layout: './layout/post.jade'
      })
    }))
    .pipe(typography())
    .pipe(prettify())
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('make-list', ['clean'], () => {
  return gulp.src(conf.object_paths)
    .pipe(filelist('index.json', {flatten: true}))
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('default', ['resources', 'posts', 'annotate'])

