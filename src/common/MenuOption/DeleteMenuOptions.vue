<script setup lang="ts">

</script>

<template>
  <section class="relative">
    <button class="text-2xl p-2 peer relative z-0">
      <i class="ri-menu-3-line"></i>
    </button>
    <section
      class="absolute z-10 right-0 h-0 overflow-hidden peer-hover:h-auto hover:h-auto hover:p-4 peer-hover:p-4 transition-all p-0 bg-white shadow-2xl flex flex-col gap-2 min-w-40"
    >
      <button class="btn-1 font-medium">Delete</button>
    </section>
  </section>
</template>

<style scoped></style>
