// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'heal',
  siteDescription: '大前端',
  plugins: [],
  // 相当于配置了路由
  // 如何为集合设置路径和模板， templates中的键一定是集合的名称
  // Posts: path:String,  这样是未指定组件，那么组件则位于src/templates/{Collection}.vue的组件将用作模板。
  templates: {
    Posts: [
      // 这个Posts是集合的名字
      {
        path: '/posts/:id', // 这个id不是形参，必须在item中存在。会在Posts集合中生成path属性，其值为：/posts/item.id。
        component: './src/templates/Post.vue'
      }
    ]
  }
}
