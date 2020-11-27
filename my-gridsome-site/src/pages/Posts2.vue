<template>
  <Layout>
    <div>
      <h1>Posts 2</h1>
      <ul>
        <li v-for="item in $page.posts.edges" :key="item.node.id">
          <g-link :to="item.node.path">{{ item.node.title }}</g-link>
        </li>
      </ul>
    </div>
  </Layout>
  <!-- 这是静态化预渲染出来的 -->
</template>

<page-query>
query {
  posts: allPosts {
    edges {
      node {
        id
        title
        content
        path
      }
    }
  }
}
</page-query>

<script>
export default {

}
</script>

<style></style>
