<script setup lang="ts">
import { useShowModalStore } from "@/stores/showModal";
import { useAuthStore } from "@/stores/auth";
import HeaderEditProfileButton from "./HeaderEditProfileButton.vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { APP_STATUS } from "@/enums/app";

// router
const router = useRouter();
// stores
const showModalStore = useShowModalStore();
const authStore = useAuthStore();
// para manejar el modal
const switchOptionsProfile = () => {
  showModalStore.setActiveModal("profile", null);
};
// app status
const appStatus = ref(APP_STATUS.IDLE);
// functions
const logout = async (): Promise<void> => {
  appStatus.value = APP_STATUS.LOADING;
  const result = await authStore.logout();
  if (result.error) {
    appStatus.value = APP_STATUS.ERROR;
    return console.log(result.message);
  }
  router.push({ name: "auth" });
  appStatus.value = APP_STATUS.SUCCESS;
};
</script>

<template>
  <section class="relative">
    <img
      @click="switchOptionsProfile"
      :src="authStore.authUser?.profile_image"
      alt="user profile"
      :class="{
        'bg-red-500 p-2 shadow-md min-w-16 w-16 h-16 object-cover lg:min-w-min lg:rounded-full lg:m-2 lg:max-w-14 lg:max-h-14 cursor-pointer': true,
        'bg-red-800': showModalStore.showModal[4].show,
      }"
    />
    <section
      :class="{
        'absolute border-y-4 border-red-500 top-[63px] lg:top-[72px] right-0 w-full transition-all bg-white shadow-xl min-w-60 text-base space-y-4 overflow-y-auto scrollbar-1': true,
        'h-0 border-none': !showModalStore.showModal[4].show,
        'h-auto max-h-80 py-4': showModalStore.showModal[4].show,
      }"
    >
      <h2 class="font-semibold text-center container">Settings</h2>
      <section class="container mt-4 flex flex-col gap-4">
        <RouterLink
          :to="{ name: 'profile', params: { email: authStore.authUser?.email } }"
          @click="
            () => showModalStore.setActiveModal('message-friends', 'close')
          "
          class="block w-full font-bolf text-lg text-center hover:underline"
        >
          View Profile
        </RouterLink>
        <HeaderEditProfileButton v-if="authStore.authUser" :userData="authStore.authUser" />
        <button
          @click="logout"
          class="block font-bolf text-lg text-center py-1 bg-red-500 text-neutral-50 w-full rounded-md hover:bg-red-600 active:bg-red-700"
        >
          Logout
        </button>
      </section>
    </section>
  </section>
</template>

<style scoped></style>
