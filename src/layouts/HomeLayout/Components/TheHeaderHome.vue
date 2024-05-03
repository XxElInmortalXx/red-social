<script setup lang="ts">
import { RouterLink } from "vue-router";
import HeaderRequestButton from "./HeaderRequestButton.vue";
import HeaderMessagesButton from "./HeaderMessagesButton.vue";
import HeaderOptionsProfile from "./HeaderOptionsProfile.vue";
import HeaderSearchButton from "./HeaderSearchButton.vue";
import { useShowModalStore } from "@/stores/showModal"
import BlockLoading from "@/common/BlockLoading.vue";
import { useAuthStore } from "@/stores/auth";

// stores
const showModalStore = useShowModalStore();
const authStore = useAuthStore();

const handleSubmitSearch = () => {
  console.log("first");
};
</script>

<template>
  <header class="shadow-xl sticky top-0 bg-white z-10">
    <nav
      class="w-full flex justify-between items-center lg:w-[90%] lg:mx-auto lg:max-w-7xl"
    >
      <RouterLink :to="{ name: 'home' }" class="block" @click="() => showModalStore.setActiveModal('message-friends', 'close')">
        <div
          class="bg-red-500 lg:bg-transparent p-2 w-16 h-16 object-cover text-4xl text-center text-neutral-50 lg:text-red-500 lg:hidden"
        >
          <!-- <i class="ri-home-fill leading-[3rem]"></i> -->
          <i class="ri-home-3-fill leading-[3rem] hover:underline"></i>
        </div>
      </RouterLink>
      <nav
        class="w-full lg:w-auto flex gap-6 items-center justify-evenly lg:justify-start text-2xl lg:-order-1"
      >
        <RouterLink
        :to="{ name: 'home' }"
        @click="() => showModalStore.setActiveModal('message-friends', 'close')"
          class="group hidden lg:flex lg:justify-center lg:items-center lg:gap-2"
        >
          <i class="ri-home-line group-hover:text-red-500 transition-all"></i>
          <p
            class="leading-none font-medium text-base group-hover:text-red-500 group-hover:underline group-hover:cursor-pointer"
          >
            Home
          </p>
        </RouterLink>
        <HeaderRequestButton />
        <HeaderMessagesButton />
        <HeaderSearchButton />
      </nav>
      <article class="flex gap-2 items-center justify-center">
        <FormKit
          id="form_search"
          @submit="handleSubmitSearch"
          type="form"
          form-class="hidden lg:flex lg:items-center lg:justify-between lg:min-w-[300px]"
          :submit-attrs="{
            inputClass: '$reset hidden',
          }"
          submit-label="Search"
        >
          <FormKit
            type="search"
            name="search"
            @click="() => showModalStore.setActiveModal('message-friends', 'close')"
            autocomplete="off"
            placeholder="Search..."
            :classes="{
              input:
                'w-full p-2 shadow-md rounded-full bg-neutral-100 border-b-0',
            }"
          />
        </FormKit>
        <BlockLoading v-if="authStore.authUser === null" />
        <HeaderOptionsProfile v-if="authStore.authUser" :userData="authStore.authUser" />
      </article>
    </nav>
  </header>
</template>

<style scoped></style>
