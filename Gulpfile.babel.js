import gulp from 'gulp'
import debug from 'gulp-debug'
import clean from 'gulp-clean'
import frontmatter from 'gulp-front-matter'
import markdown from 'gulp-markdown'
import layout from 'gulp-layout'
import typography from 'gulp-typogr'
import annotate from './lib/annotate'
import filter from 'gulp-filter'
import prettify from 'gulp-jsbeautifier'
import include from 'gulp-include'
import rename from 'gulp-rename'
import jade from 'gulp-jade'
import sequence from 'gulp-sequence'

const conf = {
  resource_paths: './resources/**/*',
  output_dir: './target',
  object_paths: './objects/**/*',
  annotation_path: 'data.json',
  jade_paths: './includes/**/*.jade',
  include_from: './tmp/includes',
  include_paths: ['./includes/**/*.md', './includes/**/*.html']
}

gulp.task('clean', () => {
  return gulp.src([conf.include_from, conf.output_dir], {read: false})
    .pipe(clean())
})

gulp.task('resources', () => {
  return gulp.src(conf.resource_paths)
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('annotate', () => {
  return gulp.src(conf.object_paths)
    .pipe(debug({title: 'annotating object'}))
    .pipe(frontmatter({
      property: 'frontmatter'
    }))
    .pipe(annotate({
      key: 'frontmatter',
      path: conf.annotation_path
    }))
    .pipe(filter(conf.annotation_path))
    .pipe(prettify())
    .pipe(gulp.dest(conf.output_dir))
})

const specifyFiletype = (type) => {
  const f = ['**/*.' + type]
  console.log('filter', f)
  return filter(f, {restore: true})
}

gulp.task('posts', ['includes', 'annotate'], () => {
  const annotation = require('./target/data.json')
  const markdownObjects = specifyFiletype('md')
  const jadeObjects = specifyFiletype('jade')
  return gulp.src(conf.object_paths)
    .pipe(debug({title: 'rendering object'}))
    .pipe(frontmatter({
      property: 'frontmatter'
    }))
    .pipe(include({
      includePaths: [conf.include_from]
    }))

    .pipe(markdownObjects)
    .pipe(markdown())
    .pipe(markdownObjects.restore)

    .pipe(jadeObjects)
    .pipe(jade({
      basedir: conf.include_paths
    })))
    .pipe(jadeObjects.restore)

    .pipe(layout((file) => {
      console.log('frontmatter', file.frontmatter)
      return Object.assign({}, annotation, {
        layout: './layout/' + (file.frontmatter.layout || 'default') + '.jade',
        page: file.frontmatter
      })
    }))
    .pipe(typography())
    .pipe(rename((path) => {
      if (path.basename[0] === '2') {
        path.dirname = path.basename.split('-').slice(3).join('-')
        path.basename = 'index'
      }
    }))
    .pipe(prettify())
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('default', sequence('clean', ['resources', 'posts']))

