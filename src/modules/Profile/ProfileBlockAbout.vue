<script setup lang="ts">
const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <section class="space-y-4 w-full col-span-1 block-module">
    <header>
      <h2 class="font-semibold text-lg">Bio</h2>
    </header>
    <main>
      <p>
        {{ userData.bio }}
      </p>
    </main>
  </section>
</template>

<style scoped></style>
