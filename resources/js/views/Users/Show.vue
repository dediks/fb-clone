<template>
  <div class="flex flex-col items-center" v-if="user && status.user === 'success'">
    <div class="relative w-full mb-8">
      <!-- cover image -->
      <div class="w-100 h-64 overflow-hidden z-10">
        <UploadableImage
          image-width="1200"
          image-height="500"
          location="cover"
          :user-image="user.data.attributes.cover_image"
          classes="object-cover w-full h-64"
          alt="Profile cover"
        />
      </div>

      <div class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12 z-20">
        <div class="w-32">
          <UploadableImage
            image-width="750"
            image-height="750"
            location="profile"
            :user-image="user.data.attributes.profile_image"
            classes="object-cover w-32 h-32 rounded-full border-2 border-gray-200 shadow-lg"
            alt="Profile image"
          />
        </div>

        <!-- <p v-if="userStatus">Name is loading...</p> -->
        <p class="text-2xl text-gray-200 ml-4">{{ user.data.attributes.name }}</p>
      </div>

      <!-- button add friends start -->
      <div class="absolute flex items-center bottom-0 right-0 mb-4 mr-12 z-20">
        <button
          v-if="friendButtonText && friendButtonText !== 'Accept'"
          class="py-1 px-3 bg-gray-400 rounded"
          @click="$store.dispatch('sendFriendRequest', $route.params.userId)"
        >{{ friendButtonText }}</button>
        <button
          v-if="friendButtonText && friendButtonText === 'Accept'"
          class="mr-2 py-1 px-3 bg-blue-500 rounded"
          @click="$store.dispatch('acceptFriendRequest', $route.params.userId)"
        >Accept</button>
        <button
          v-if="friendButtonText && friendButtonText === 'Accept'"
          class="py-1 px-3 bg-gray-500 rounded"
          @click="$store.dispatch('ignoreFriendRequest', $route.params.userId)"
        >Ignore</button>
      </div>
      <!-- button add friends end -->
    </div>

    <p v-if="status.posts === 'loading'">Post is loading...</p>

    <p v-else-if="posts.length < 1">No Post found. Get started</p>

    <Post v-else v-for="(post, postKey) in posts.data" :key="postKey" :post="post" />
  </div>
</template>

<script>
import Post from "../../components/Post";
import UploadableImage from "../../components/UploadableImage";
import { mapGetters } from "vuex";

export default {
  name: "Show",
  components: {
    Post,
    UploadableImage,
  },
  computed: {
    ...mapGetters({
      user: "user",
      friendButtonText: "friendButtonText",
      posts: "posts",
      status: "status",
    }),
  },
  mounted() {
    this.$store.dispatch("fetchUser", this.$route.params.userId);
    this.$store.dispatch("fetchUserPosts", this.$route.params.userId);
  },
};
</script>

<style scoped>
</style>

