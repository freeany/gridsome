// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
module.exports = function(api) {
  // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

  api.loadSource(async actions => {
    const post = actions.addCollection('Posts')

    const { data: postData } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    )

    for (const item of postData) {
      post.addNode({
        id: item.id,
        title: item.title,
        content: item.body
      })
    }

    // https://jsonplaceholder.typicode.com/comments
    const comments = actions.addCollection('Comments')

    const { data: commentsData } = await axios.get(
      'https://jsonplaceholder.typicode.com/comments'
    )

    for (const item of commentsData) {
      comments.addNode({
        id: item.id,
        title: item.title,
        content: item.body
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/my-page',
      component: './src/templates/MyPage.vue'
    })
  })
}
