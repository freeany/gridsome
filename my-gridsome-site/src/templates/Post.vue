<template>
  <Layout>
    <div>
      <h1>{{ $page.posts.title }}</h1>
      <p>{{ $page.posts.content }}</p>
    </div>
  </Layout>
</template>


<page-query>
query($id: ID!) {
  posts(id: $id) {
    id
    title
    content
  }
}
</page-query>


<script>
export default {
  name: 'PostPage',
  // 如果让页面的title和文章的title一致，则要设置metaInfo
  metaInfo () {
    return {
      title: this.$page.posts.title
    }
  }

}
</script>

<style>
</style>
