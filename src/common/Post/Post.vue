<script setup lang="ts">
import type { Server_Post } from "@/types/post";
import PostMenuOptions from "../MenuOption/PostMenuOptions.vue";
import PostButtonComments from "@/common/Post/PostButtonComments.vue";
import { ref } from "vue";

// propps
const props = defineProps<{
  post: Server_Post;
}>();

// functions
const likeButton = ref(false);
const handleLikeButton = () => {
  likeButton.value = !likeButton.value;
  console.log("like");
};

const handleShareButton = () => {
  console.log("share");
};
</script>

<template>
  <section class="block-module">
    <header class="flex gap-4 items-center justify-between w-full">
      <section class="flex gap-4 items-center">
        <RouterLink
          :to="{ name: 'profile', params: { email: props.post?.author.email } }"
        >
          <img
            :src="props.post?.author.image"
            alt="user profile"
            class="w-12 h-12 object-cover rounded-full"
          />
        </RouterLink>
        <p>
          <RouterLink
            class="block font-semibold hover:underline text-ellipsis text-nowrap overflow-hidden max-w-28 sm:max-w-none"
            :to="{
              name: 'profile',
              params: { email: props.post?.author.email },
            }"
            >{{ props.post?.author.name }}</RouterLink
          >
          <span class="block font-light text-xs">{{
            props.post?.updated_at
          }}</span>
        </p>
      </section>
      <PostMenuOptions :post="props.post" />
    </header>
    <main>
      <article class="mt-4">
        <p>{{ props.post?.content }}</p>
        <section
          v-if="props.post?.images.length === 1"
          class="mt-4 w-full min-h-60 max-h-96 rounded-md overflow-hidden"
        >
          <img
            :src="props.post?.images[0]"
            alt="post-1"
            class="w-full h-full object-cover"
          />
        </section>
        <section
          v-if="props.post?.images.length > 1"
          class="mt-4 w-full min-h-60 max-h-96 rounded-md overflow-hidden grid gap-2 grid-cols-5 grid-rows-3"
        >
          <img
            v-if="props.post?.images[0]"
            :src="props.post?.images[0]"
            alt="post-1"
            class="w-full h-full object-cover col-span-3 row-span-3"
          />
          <img
            v-if="props.post?.images[1]"
            :src="props.post?.images[1]"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
          <img
            v-if="props.post?.images[2]"
            :src="props.post?.images[2]"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
          <img
            v-if="props.post?.images[3]"
            :src="props.post?.images[3]"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
        </section>
      </article>
    </main>
    <footer class="flex justify-between items-center mt-4">
      <section class="flex gap-2 text-xl items-center justify-center">
        <button class="hover:underline" @click="() => handleLikeButton()">
          <i v-if="likeButton" class="ri-heart-2-fill text-red-500"></i>
          <i v-else class="ri-heart-2-line"></i>
        </button>
        <p class="text-sm text-neutral-500">0 likes</p>
      </section>
      <section class="flex gap-2 text-xl items-center justify-center">
        <PostButtonComments />
        <p class="text-sm text-neutral-500">0 Comment</p>
      </section>
      <section class="flex gap-2 text-xl items-center justify-center">
        <button class="hover:underline" @click="() => handleShareButton()">
          <i class="ri-share-line"></i>
        </button>
        <p class="text-sm text-neutral-500">0 Share</p>
      </section>
    </footer>
  </section>
</template>

<style scoped></style>
