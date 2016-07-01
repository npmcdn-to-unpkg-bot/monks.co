import riot from 'riot'
import path from 'path'
import through from 'through2'

export default (conf) => {
  return through.obj((file, encoding, callback) => {
    const data = conf.dataFn(file)
    // const layout = (data.layout || 'default') + '.tag'
    const layout = 'html.tag'
    const tagsPath = conf.tags_path
    const requirePath = path.join('..', tagsPath, layout)
    console.log('require path', requirePath)
    require(requirePath)
    const tagName = 'html'
    console.log('tagName', tagName)
    const renderedTagHtml = riot.render(tagName, data)
    console.log(renderedTagHtml)

    file.contents = new Buffer(renderedTagHtml, 'utf8')
    return callback(null, file)
  })
}

