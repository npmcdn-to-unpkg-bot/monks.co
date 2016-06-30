import riot from 'riot'
import path from 'path'
import through from 'through2'
import glob from 'glob'

// allow to require('some.tag')

const tagExtension = (module, filename) => {
  let src = riot.compile(require('fs').readFileSync(filename, 'utf8'))
  console.log('requiring tag', filename)
  let srcBlocks = src.split('---')
  if (srcBlocks[0].length === 0) {
    console.log('removing frontmatter')
    srcBlocks.splice(0, 2)
    src = srcBlocks.join('---')
  }
  console.log('src:', src)
  module._compile(
    'var riot = require("riot/riot.js"); module.exports =' + src,
    filename
  )
}
require.extensions['.tag'] = tagExtension

export { tagExtension }

export default (conf) => {
  // require all the tags
  console.log('conf', conf)
  console.log('tags path', conf.tag_paths)
  const tagsPath = conf.tag_paths
  glob(tagsPath, function (err, tags) {
    if (err) { return console.log('ERROR', err) }
    console.log('tags', tags)
    tags.forEach(function (tag) {
      console.log('requiring tag', tag)
      require(path.join('..', tag))
    })
  })
  return through.obj((file, encoding, callback) => {
    console.log('file', file)
    Object.keys(file).map(console.log, 'key')
    console.log('path', file.path)
    const tagName = path.parse(file.path).name
    console.log('tagName', tagName)
    require(path.join('..', '..', 'objects', tagName + '.tag'))
    console.log('data', file.data)
    const the_tag = riot.render.tag(tagName, file.data)
    console.log('the tag', the_tag)
    const renderedTagHtml = riot.render(tagName, file.data)
    file.contents = new Buffer(renderedTagHtml, 'utf8')

    return callback(null, file)
  })
}

