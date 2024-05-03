<script setup lang="ts">
import BlockLoading from "@/common/BlockLoading.vue";
import CardProfile from "@/common/CardProfile.vue";
import { useAuthStore } from "@/stores/auth";

// stores
const authStore = useAuthStore();
</script>

<template>
  <section class="block-module w-full lg:col-span-3 grid gap-2 lg:grid-cols-2">
    <BlockLoading v-if="authStore.authUser === null" class="lg:col-span-2" />
    <CardProfile v-else class="p-2 shadow-xl w-full" v-for="i in 3" />
    <button
      class="col-span-1 lg:col-span-2 text-center mt-8 w-full hover:underline hover:text-red-500 transition-all text-lg"
    >
      Load more
    </button>
  </section>
</template>

<style scoped></style>
