<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeaderHome from "./Components/TheHeaderHome.vue";
import TheFooterHome from "./Components/TheFooterHome.vue";
</script>

<template>
  <TheHeaderHome />
  <RouterView />
 <TheFooterHome /> 
</template>

<style scoped></style>
