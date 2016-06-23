import gulp from 'gulp'
import clean from 'gulp-clean'
import filelist from 'gulp-filelist'

const conf = {
  resource_paths: ['./resources/**/*'],
  output_dir: './target',
  object_paths: './_posts/**/*'
}

gulp.task('clean', () => {
  return gulp.src(conf.output_dir, {read: false})
    .pipe(clean())
})

gulp.task('resources', ['clean'], () => {
  return gulp.src(conf.resource_paths)
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('make-list', ['clean'], () => {
  return gulp.src(conf.object_paths)
    .pipe(filelist('index.json', {flatten: true}))
    .pipe(gulp.dest(conf.output_dir))
})

gulp.task('default', ['resources', 'make-list'])

