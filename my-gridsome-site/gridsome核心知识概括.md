### Gridsome

> 一个免费、开源、基于vue.js技术栈的静态网站生成器,  使用gridsome可以快速开发静态网站.

官方地址： `https://gridsome.org/docs/`

- 什么是静态网站生成器
  - 静态网站生成器是使用一系列配置、模板以及数据，生成静态HTML文件及相关资源的工具。
  - 这个功能也叫做预渲染
  - 生成的网站不需要类似php这样的服务器
  - 只需要放到支持静态资源的web server 或 cdn上即可运行
- 静态网站的好处
  - 省钱
    - 不需要专业的服务器，只要能托管静态文件的空间即可。
  - 快速
    - 不经过后端服务器的处理，只传输内容
  - 安全
    - 没有后端程序的执行，自然会更安全
- 常见的静态网站生成器
  - Jekyll (Ruby)
  - Hexo (Node)
  - Hogo (Golang)
  - Gatsby (Node/React)
  - Gridsome (Node/Vue)
  - 另外，Next.js, Nuxt.js 也能生成静态网站， 但是它们更多被认为是ssr(服务端渲染)框架
- JAMStack
  - 这类静态网站生成器还有个漂亮的名字叫 JAMStack
  - JAMStack 的 JAM是JavaScript、API和Markup的首字母结合
  - 本质上是一种胖前端，通过调用各种API来实现更多的功能
  - 其实也是一种前后端的模式，只不过离的比较开，甚至前后端来自多个不同的厂商。
- 例如 Gridsome
  - 拿到不同渠道来的数据， 通过gridsome进行打包， 最后放置到web server  或 cdn上。
- 静态应用的使用场景
  - 不适合有大量路由页面的应用
    - 如果您的站点有成百上千条路由页面，则预渲染将非常缓慢。当然，您每次更新只需要做一次，但是可能要花一些时间。大多数人不会最终获得数千条静态路由页面，而只是以防万一。
  - 不适合有大量动态内容的应用
    - 如果渲染路线中包含特定于用户查看其内容或其他动态源的内容，则应确保您具有可以显示的占位符组件，直到动态内容加载到客户端位置，否则可能有点怪异。例如：**博客，企业宣传站这种文档类的比较适做为静态站点，而像后台管理系统这样有大量增删改查的动态内容则不适合。** 
  - 极致体验的应用场景

#### 安装 gridsome cli

`npm install --global @gridsome/cli`

- 安装的过程中需要安装一个sharp包的依赖，  sharp包含一些c++文件，需要有一个c++编译环境，sharp还依赖了一个libvips依赖，几十M。

- 需要配置chinese mirror更有效的去安装sharp

  `https://sharp.pixelplumbing.com/install#chinese-mirror`

- 配置c++的编译环境node-gyp，编译nodejs中的c++扩展包的。

  `npm install -g node-gyp`

  `https://github.com/nodejs/node-gyp`

  不过还是要需要c++编译工具。 如py2.7/3.5/3.6/3.7/3.8(不管哪个平台都需要)， window平台安装编译本地编译c++模块(必须使用管理员启动cmd/shell 运行)`npm install --global windows-build-tools`

- 执行安装命令

  `gridsome create my-gridsome-site`

   compiling from source报错，需要在hosts文件中配置

  `199.232.4.133 raw.githubusercontent.com`

- 约定 pages 下的文件自动生成路由

- `npm run build`  将项目打包成静态文件，就可以部署在任何服务器下面了。全局安装serve在本地测试， serve dist 启动一个本地服务器。

- gridsome打包的页面都是路由地址。不管是在pages下面自动约定的页面路由，还是在grdisome项目中在gridsome.serve.js中手动配置的路由，或者是在gridsome.config.js中手动配置的templates 路由页面模板都会被打包。 反之如果不成路由，则不会被打包。

#### gridsome.config.js

> https://gridsome.org/docs/config/

```js
siteName: String 每个页面共有的title。// 统一配置每个页面的共有title。xxx是每个页面单独配置的(vue-meta metaInfo)
siteDesciption: String 配置每个页面的meta标签。siteDesciption: '大前端'
titleTemplate: '%s - <siteName>' title的模板
configureWebpack： Obejct|Function 指定webpack的配置
```

#### 动态路由

- 基于文件的动态路由(File-based dynamic routes)

  ```js
  src/pages/user/[id].vue becomes /user/:id.
  src/pages/user/[id]/settings.vue becomes /user/:id/settings.
  ```

- 通过编程的方式创建动态路由(Programmatic dynamic routes) 在gridsome.server.js中

  ```js
  module.exports = function (api) {
    api.createPages(({ createPage }) => {
      createPage({
        path: '/user/:id(\\d+)',
        component: './src/templates/User.vue'
      })
    })
  }
  ```

- page meta info

  > gridsome使用vue-meta来处理页面的meta信息

#### 404 not found

- gridsome有默认的 404 页面， 要自定义404页面，需要在pages目录下添加404.vue

#### collection 集合

1. 集合包含很多节点，每个节点都对应一个页面
2. 将集合中的数据预渲染到页面上

- 创建集合，

  -  通过source plugins， 可以将wordpress/markdown等源的数据存储到集合中

  - 通过获取接口数据的方式，将接口数据存储到集合中。

    ```js
    // gridsome.server.js
    const axios = require('axios')
    module.exports = function (api) {
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
      })
    }
    ```

- 通过GraphQL查询集合数据

  > 创建的每一个集合都会在GraphQL中创建 xxx 和 allxxx集合， 前者查询单个数据，后者 查询集合

  ```js
  # Write your query or mutation here
  # 查询posts集合中id为2的数据 的id 和 title
  # query {
  #   posts(id: 2) {
  #     id
  #     title
  #   }
  # }
  # 查询posts集合（可指定查询参数）
  query {
    allPosts {
      edges {
        node {
          id
          title
        }
      }
    }
  ```

- 如何在页面上查询数据，去预渲染页面呢

  `https://gridsome.org/docs/querying-data/`

  ```js
  // 此标签与template同级
  <page-query>
  query {
    posts: allPosts {
      edges {
        node {
          id
          title
        }
      }
    }
  }
  </page-query>
  ```

  ```js
  // template 
  <li v-for="item in $page.posts.edges" :key="item.node.id">
  	<g-link>{{ item.node.title }}</g-link>
  </li>
  ```

  打开network，发现/posts2  路径的preview 是空白的，因为我们在开发模式下。所以我们要打包，然后服务器启动，这样才能查看路径 所返回的完整的结果。

  动态数据通过GraphQL的数据层静态化到静态页面中，形成静态网页。

- 在  gridsome.server.js 中有节点的数据，还应该有节点的模板(比如 文章详情的模板--- 通过id获取的数据)。节点的模板如何定义？

  `https://gridsome.org/docs/templates/`

- 在gridsome.config.js中定义模板

  ```js
  module.exports = {
    // 相当于配置了路由
    // 为集合如何设置路径和模板，
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
  ```

  这样就可以使用路由访问/posts/:id了， 当配置好这个之后，在Posts集合中多了一个path属性。这个path就是/posts/每一项的id， 这就是 :id不能乱写的原因.

#### 文章详情

- 当点击每一文章标题打开一个文章的时候，路径为: `/posts/:id`  在Post.vue中，接收id参数，去GraphQL中查询数据,  查询单条的条件必须是唯一值。

  ```bash
  <page-query>
  query($id: ID!) {  // 变量必须以$开头 接收的是id
    posts(id: $id) {
      id
      title
      content
    }
  }
  </page-query>
  ```

  