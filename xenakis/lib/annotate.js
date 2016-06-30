import through from 'through2'
import File from 'vinyl'

let objects = []
let categories = {}

const addCategory = (category, post) => {
  if (categories[category]) {
    categories[category].push(post)
  } else {
    categories[category] = [post]
  }
}

export default (conf) => {
  return through.obj((file, encoding, callback) => {
    // each file
    const frontmatter = file[conf.key || 'frontMatter']
    objects.push(frontmatter)
    if (frontmatter.category) {
      addCategory(frontmatter.category, frontmatter)
    }
    if (frontmatter.categories) {
      for (let category of frontmatter.categories) {
        addCategory(category, frontmatter)
      }
    }
    callback(null, file)
  },
  function (callback) {
    // stream over
    const output = {
      objects: objects,
      categories: categories
    }
    this.push(new File({
      path: conf.path,
      contents: new Buffer(JSON.stringify(output))
    }))
    callback()
  })
}

