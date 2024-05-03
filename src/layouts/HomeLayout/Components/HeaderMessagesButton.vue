<script setup lang="ts">
import DeleteMenuOptions from "@/common/MenuOption/DeleteMenuOptions.vue";
import { useShowModalStore } from "@/stores/showModal"

// stores
const showModalStore = useShowModalStore()

const switchModalMessages = () => {
  showModalStore.setActiveModal("messages", null);
};

const switchMessageToFriends = (value: "open" | "close") => {
  showModalStore.setActiveModal("message-friends", value);
};
</script>

<template>
  <section class="relative">
    <button
      @click="switchModalMessages"
      :class="{
        'group lg:flex lg:justify-center lg:items-center lg:gap-2': true,
        'text-red-500': showModalStore.showModal[1].show,
        'text-neutral-800': !showModalStore.showModal[1].show,
      }"
    >
      <i class="ri-message-line group-hover:text-red-500 transition-all"></i>
      <p
        class="hidden sm:block leading-none font-medium text-base group-hover:text-red-500 group-hover:underline group-hover:cursor-pointer"
      >
        Messages
      </p>
    </button>
    <section
      :class="{
        'absolute border-y-2 border-red-500 top-[56px] lg:top-[52px] -left-12 lg:left-auto w-full transition-all bg-white shadow-xl min-w-60 text-base space-y-4 overflow-y-auto scrollbar-1': true,
        'h-0 border-none': !showModalStore.showModal[1].show,
        'h-auto max-h-80 py-4': showModalStore.showModal[1].show,
      }"
    >
      <h2 class="font-semibold text-center lg:text-left container">
        Recent Messages
      </h2>
      <section
        v-for="i in 10"
        class="container flex gap-4 items-center justify-between w-full"
      >
        <section class="flex gap-4 items-center">
          <button @click="() => switchMessageToFriends('open')">
            <img
              src="../../../static/profile-small-1.webp"
              alt="user profile"
              class="w-12 h-12 object-cover rounded-full"
            />
          </button>
          <p>
            <button
              @click="() => switchMessageToFriends('open')"
              class="block font-semibold hover:underline text-ellipsis text-nowrap overflow-hidden max-w-16 sm:max-w-24 lg:max-w-none"
              >Name User</button
            >
            <span class="block font-light text-xs">2 hours ago</span>
          </p>
        </section>
        <DeleteMenuOptions />
      </section>
      <!-- button para ver mas -->
      <button
        class="col-span-1 lg:col-span-2 text-center mt-8 w-full hover:underline hover:text-red-500 transition-all text-lg"
      >
        Load more
      </button>
    </section>
  </section>
</template>

<style scoped></style>
