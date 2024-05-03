<script setup lang="ts">
import FooterSearchFriends from "./FooterSearchFriends.vue";
import FooterSendMessageToFriends from "./FooterSendMessageToFriends.vue";
import { useShowModalStore } from "@/stores/showModal"

// stores
const showModalStore = useShowModalStore()

const switchShowMessageFriends = () => {
  showModalStore.setActiveModal("message-friends", "open");
};
</script>

<template>
  <footer class="fixed bottom-0 w-full py-2 bg-neutral-50">
    <div
      class="grid grid-cols-1 lg:grid-cols-4 gap-2 max-w-7xl w-[90%] mx-auto"
    >
      <FooterSearchFriends />
      <section
        class="hidden lg:overflow-x-auto scrollbar-1 lg:flex lg:gap-4 lg:justify-evenly lg:items-center col-span-2 p-2 shadow-xl bg-white"
      >
        <img
          v-for="i in 12"
          @click="switchShowMessageFriends"
          src="../../../static/profile-small-1.webp"
          alt="profile friend"
          class="hover:cursor-pointer w-8 h-8 rounded-full object-cover"
        />
      </section>
      <FooterSendMessageToFriends />
    </div>
  </footer>
</template>

<style scoped></style>
