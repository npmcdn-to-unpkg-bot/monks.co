import gulp from 'gulp'
import data from 'gulp-data'
import clean from 'gulp-clean'
import frontmatter from 'gulp-front-matter'
import markdown from 'gulp-markdown'
import layout from './lib/riot-layout.js'
import typography from 'gulp-typogr'
import filter from 'gulp-filter'
import prettify from 'gulp-jsbeautifier'
import rename from 'gulp-rename'
import jade from 'gulp-jade'
import sequence from 'gulp-sequence'

import path from 'path'

import riot from './lib/riot'
import annotate from './lib/annotate'

const conf = {
  tmp_dir: './tmp',
  resource_paths: '../resources/**/*',
  output_dir: '../target',
  object_paths: '../objects/**/*',
  layout_path: '../layouts',
  tag_paths: '../tags/**/*.tag',
  annotation_path: 'data.json'
}

gulp.task('clean', () => {
  return gulp.src(
    [
      conf.output_dir,
      './tmp'
    ], {read: false})
    .pipe(clean({force: true}))
})

gulp.task('object-tags', () => {
  return gulp.src(conf.object_paths + '.tag')
    .pipe(frontmatter({
      remove: true
    }))
    .pipe(gulp.dest(conf.tmp_dir))
})

gulp.task('tags', ['object-tags'], () => {
  return gulp.src(conf.tag_paths)
    .pipe(gulp.dest(conf.tmp_dir))
})

gulp.task('resources', () => {
  return gulp.src(conf.resource_paths)
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('annotate', () => {
  return gulp.src(conf.object_paths)
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
  const f = ['../**/*.' + type]
  console.log('filter', f)
  return filter(f, {restore: true})
}

gulp.task('posts', ['tags', 'annotate'], () => {
  const annotation = require(path.join(conf.output_dir, '/data.json'))

  const markdownObjects = specifyFiletype('md')
  const jadeObjects = specifyFiletype('jade')
  const tagObjects = specifyFiletype('tag')

  return gulp.src(conf.object_paths)
    .pipe(frontmatter({
      property: 'frontmatter'
    }))

    .pipe(data((file) => {
      return Object.assign({}, annotation, {
        layout: path.join(conf.layout_path, (file.frontmatter.layout || 'default') + '.jade'),
        page: file.frontmatter
      })
    }))

    .pipe(tagObjects)
    .pipe(riot({
      tag_paths: path.join(conf.tmp_dir, '**', '*.tag')
    }))
    .pipe(tagObjects.restore)

    .pipe(markdownObjects)
    .pipe(markdown())
    .pipe(markdownObjects.restore)

    .pipe(jadeObjects)
    .pipe(jade())
    .pipe(jadeObjects.restore)

    .pipe(layout({
      dataFn: (file) => { return file.data },
      tags_path: conf.tmp_dir
    }))

    // TODO: only do riot if there's a tags file
    .pipe(prettify())

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

