<script setup lang="ts">
import BlockLoading from "@/common/BlockLoading.vue";
import CardProfile from "@/common/CardProfile.vue";
import Post from "@/common/Post/Post.vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// stores
const authStore = useAuthStore();

</script>

<template>
  <section class="block-module w-full lg:col-span-2">
      <header>
        <h2
          class="font-semibold text-lg text-center pb-2 border-b-2 border-neutral-800"
        >
          Posts
        </h2>
      </header>
      <main>
        <article class="space-y-4 mt-8 px-4">
          <BlockLoading v-if="authStore.authUser === null" />
          <Post v-else />
          <button
            class="text-center mt-8 w-full hover:underline hover:text-red-500 transition-all text-lg"
          >
            Load more
          </button>
        </article>
      </main>
    </section>
    <section class="block-module w-full col-span-1">
      <header>
        <h2
          class="font-semibold text-lg text-center pb-2 border-b-2 border-neutral-800"
        >
          Friends
        </h2>
      </header>
      <BlockLoading v-if="authStore.authUser === null" />
      <div v-else>
        <main class="grid grid-cols-2 lg:grid-cols-1 gap-4 mt-8">
        <CardProfile v-for="i in 4" class="p-2 bg-white shadow-xl" />
      </main>
      <footer>
        <RouterLink
          :to="{ name: 'profile-friends' }"
          class="block text-center mt-8 hover:underline hover:text-red-500 transition-all text-lg"
          >lead more</RouterLink
        >
      </footer>
      </div>
    </section>
</template>

<style scoped></style>
