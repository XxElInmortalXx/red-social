<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useShowModalStore } from "@/stores/showModal";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import BlockLoading from "@/common/BlockLoading.vue";
import ProfileBlockAbout from "@/modules/Profile/ProfileBlockAbout.vue";

// stores
const showModalStore = useShowModalStore();
const authStore = useAuthStore();
// route
const route = useRoute();
const { email } = route.params;
// functions
const switchMessageToFriends = (value: "open" | "close") => {
  showModalStore.setActiveModal("message-friends", value);
};
const getProfile = () => {
  if (email === authStore.authUser?.email) return;
  console.log(email)
};

onMounted(() => {
  getProfile()
});

</script>

<template>
  <header>
    <BlockLoading v-if="authStore.authUser === null" />
    <section v-else class="relative z-0 w-full">
      <img
        :src="authStore.authUser?.cover_image"
        alt="banner profile"
        class="w-full min-h-20 max-h-40 lg:max-h-80 object-cover border-inherit"
      />
      <img
        :src="authStore.authUser?.profile_image"
        alt="profile"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-28 p-2 bg-neutral-50"
      />
    </section>
    <section class="bg-neutral-50 shadow-xl p-6 pt-16">
      <nav class="container-medium flex gap-3 justify-center items-center">
        <RouterLink
          :to="{ name: 'profile' }"
          class="hover:underline hover:text-red-500 font-medium"
        >
          Timeline
        </RouterLink>
        <p>/</p>
        <RouterLink
          :to="{ name: 'profile-friends' }"
          class="hover:underline hover:text-red-500 font-medium"
        >
          Friends
        </RouterLink>
      </nav>
      <div class="container-medium flex gap-2">
        <button class="btn-3 mt-2" @click="() => switchMessageToFriends('open')">Message</button>
        <button class="btn-4 mt-2">Send Request</button>
      </div>
    </section>
  </header>

  <!-- <main class="main-principal"> -->
    <main class="main-principal">
    <BlockLoading v-if="authStore.authUser === null" />
    <ProfileBlockAbout v-else :userData="authStore.authUser" />
    <RouterView />
  </main>
  <!-- </main> -->
</template>

<style scoped></style>
