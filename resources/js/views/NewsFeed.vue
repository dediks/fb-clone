<template>
  <div class="flex flex-col py-4 justify-center items-center">
    <NewPost />

    <p v-if="newsStatus.newsPostsStatus === 'loading'">Loading....</p>
    <Post v-else v-for="(post, postKey) in posts.data" :key="postKey" :post="post" />
  </div>
</template>

<script>
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { mapGetters } from "vuex";
export default {
  name: "NewsFeed",
  components: {
    NewPost,
    Post
  },
  mounted() {
    this.$store.dispatch("fetchNewsPosts");
  },
  computed: {
    ...mapGetters({
      posts: "newsPosts",
      newsStatus: "newsStatus"
    })
  }
};
</script>

<style scoped>
</style>

