<script setup lang="ts">
import CreatePost from "@/common/Post/CreatePost.vue";
import Post from "@/common/Post/Post.vue";
import HomeBlockAdvertizement from "@/modules/Home/HomeBlockAdvertizement.vue";
import HomeBlockProfile from "@/modules/Home/HomeBlockProfile.vue";
import { useShowModalStore } from "@/stores/showModal";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post"
import BlockLoading from "@/common/BlockLoading.vue";
import { onMounted, ref } from "vue";
import { getPosts } from "@/services/post";
import type { Server_Post } from "@/types/post";
import type { DocumentData } from "firebase/firestore";

// stores
const authStore = useAuthStore();
const showModalStore = useShowModalStore();
const postStore = usePostStore()

// onMounted
onMounted(() => {
  handleGetPosts();
});

// functions
const handleGetPosts = async () => {
  if (postStore.posts.length > 0) return
  const result = await getPosts();
  if (result.error) {
    return console.log(result.message);
  }
  postStore.posts = result.data?.docs.map((post: DocumentData) => post.data()).reverse();
};
</script>

<template>
  <main
    class="main-principal"
    @click="() => showModalStore.setActiveModal('message-friends', 'close')"
  >
    <section class="w-full">
      <BlockLoading v-if="authStore.authUser === null" />
      <HomeBlockProfile
        v-if="authStore.authUser"
        :userData="authStore.authUser"
      />
    </section>
    <section class="lg:col-span-2 flex flex-col gap-4 w-full">
      <BlockLoading v-if="authStore.authUser === null" />
      <CreatePost v-if="authStore.authUser" :userData="authStore.authUser" />
      <BlockLoading v-if="postStore.posts.length === 0" />
      <Post v-else v-for="post in postStore.posts" :key="post.id" :post="post" />
      <button
        class="text-center mt-8 w-full hover:underline hover:text-red-500 transition-all text-lg"
      >
        Load more
      </button>
    </section>
    <section class="w-full">
      <HomeBlockAdvertizement />
    </section>
  </main>
</template>

<style scoped></style>
