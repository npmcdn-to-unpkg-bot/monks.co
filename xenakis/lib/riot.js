import riot from 'riot'
import path from 'path'
import through from 'through2'
import glob from 'glob'

export default (conf) => {
  return through.obj((file, encoding, callback) => {
    const tagsPath = conf.tag_paths
    glob(tagsPath, function (err, tags) {
      if (err) { return console.log('ERROR', err) }
      tags.forEach(function (tag) {
        console.log('requiring tag', tag)
        require(path.join('..', tag))
      })
      const tagName = path.parse(file.path).name
      console.log('tagName', tagName)
      const renderedTagHtml = riot.render(tagName, file.data)
      file.contents = new Buffer(renderedTagHtml, 'utf8')
      return callback(null, file)
    })
  })
}

