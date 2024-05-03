<script setup lang="ts">
import { RouterLink } from "vue-router";
import DeleteMenuOptions from "@/common/MenuOption/DeleteMenuOptions.vue";
</script>

<template>
  <section class="flex gap-4 items-center justify-between w-full">
    <section class="flex gap-4 items-center">
      <RouterLink
        :to="{ name: 'profile', params: { email: 'ejemplo@ejemplo.com' } }"
      >
        <img
          src="../static/profile-small-1.webp"
          alt="user profile"
          class="w-12 h-12 object-cover rounded-full"
        />
      </RouterLink>
      <p>
        <RouterLink
          class="block font-semibold hover:underline text-ellipsis text-nowrap overflow-hidden max-w-16 sm:max-w-24 lg:max-w-none"
          :to="{ name: 'profile', params: { email: 'ejemplo@ejemplo.com' } }"
          >Name User</RouterLink
        >
        <span class="block font-light text-xs">2 hours ago</span>
      </p>
    </section>
    <DeleteMenuOptions />
  </section>
</template>

<style scoped></style>
