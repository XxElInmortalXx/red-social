<script setup lang="ts">
import { useShowModalStore } from "@/stores/showModal";

// stores
const showModalStore = useShowModalStore();

const switchMessageToFriends = (value: "open" | "close") => {
  showModalStore.setActiveModal("message-friends", value);
};

const handleSubmitMessageToFriends = () => {
  console.log("first");
};
</script>

<template>
  <section class="block p-2 shadow-xl bg-white flex-1 w-full relative">
    <FormKit
      id="form_search"
      @submit="handleSubmitMessageToFriends"
      type="form"
      form-class="w-full flex grid-cols-2 items-center justify-between"
      :submit-attrs="{
        inputClass:
          '$reset bg-red-500 text-neutral-50 px-2 py-2 shadow-xl block',
      }"
      submit-label="Enviar"
    >
      <FormKit
        type="text"
        name="message"
        @click="() => switchMessageToFriends('open')"
        placeholder="Message..."
        autocomplete="off"
        :classes="{
          input: 'w-full p-2 shadow-md bg-neutral-100 border-b-0',
        }"
      />
    </FormKit>
    <section
      :class="{
        'shadow-xl bg-neutral-50 w-full absolute bottom-[4.5rem] left-0 border-red-500 h-0 transition-all': true,
        'p-0 h-0 overflow-y-hidden border-t-0':
          !showModalStore.showModal[3].show,
        'p-3 h-auto border-t-8': showModalStore.showModal[3].show,
      }"
    >
      <section
        class="flex gap-4 items-center justify-between w-full border-b-4 border-red-500 p-2"
      >
        <section class="flex gap-4 items-center">
          <RouterLink
            :to="{ name: 'profile', params: { email: 'ejemplo@ejemplo.com' } }"
          >
            <img
              src="../../../static/profile-small-1.webp"
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
        <button @click="() => switchMessageToFriends('close')" class="text-lg">
          <i class="ri-close-fill"></i>
        </button>
      </section>
      <article
        class="overflow-y-auto scrollbar-1 h-[calc(100vh-285px)] lg:h-[calc(100vh-270px)] space-y-2 mt-2"
      >
        <p class="p-2 mx-1 ml-2 text-neutral-50 rounded-md bg-green-500 w-fill">
          Lorem ipsum dolo
        </p>
        <p class="p-2 mr-2 text-neutral-50 rounded-md bg-blue-500 w-fill">
          Lorem ipsum dolo
        </p>
      </article>
    </section>
  </section>
</template>

<style scoped></style>
