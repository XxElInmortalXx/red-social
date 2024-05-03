<script setup lang="ts">
// props
const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <section class="relative z-0 w-full">
      <img
        :src="props.userData?.cover_image"
        alt="banner profile"
        class="w-full min-h-20 max-h-40 object-cover border-inherit p-3 bg-red-500"
      />
      <img
        :src="props.userData?.profile_image"
        alt="profile"
        class="w-20 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
      />
    </section>
    <section class="block-module text-center w-full">
      <RouterLink
        :to="{ name: 'profile', params: { email: props.userData?.email } }"
        class="block mt-6 font-bolf text-lg hover:underline"
      >
        {{ props.userData?.displayName }}</RouterLink
      >
      <p>
        {{ props.userData?.email }}
      </p>
    </section>
  </section>
</template>

<style scoped></style>
