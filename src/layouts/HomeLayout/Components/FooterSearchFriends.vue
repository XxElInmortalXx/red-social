<script setup lang="ts">
import CardProfile from "@/common/CardProfile.vue";
import { ref } from "vue";

const showResultSearchFriends = ref(false);
const switchResultSearchFriends = (value: "open" | "close") => {
  if (value === "open") return (showResultSearchFriends.value = true);
  showResultSearchFriends.value = false;
};

const handleSubmitFriendsSearch = () => {
  switchResultSearchFriends("open");
};
</script>

<template>
  <section class="hidden lg:block p-2 shadow-xl bg-white relative">
    <FormKit
      id="form_search"
      @submit="handleSubmitFriendsSearch"
      type="form"
      form-class="w-full flex grid-cols-2 items-center justify-between"
      :submit-attrs="{
        inputClass:
          '$reset bg-red-500 text-neutral-50 px-2 py-2 shadow-xl block',
      }"
      submit-label="Search"
    >
      <FormKit
        type="text"
        name="message"
        placeholder="Friends..."
        autocomplete="off"
        :classes="{
          input: 'w-full p-2 shadow-md bg-neutral-100 border-b-0',
        }"
      />
    </FormKit>
    <section
      v-if="showResultSearchFriends"
      class="p-2 shadow-xl bg-neutral-50 w-full absolute bottom-[4.5rem] left-0 border-t-8 border-red-500"
    >
      <button
        @click="() => switchResultSearchFriends('close')"
        class="w-full text-center py-1 bg-red-500 text-neutral-50 hover:bg-red-600"
      >
        close
      </button>
      <article class="max-h-80 overflow-y-auto scrollbar-1 space-y-4 mt-4">
        <CardProfile v-for="i in 6" class="px-2" />
      </article>
    </section>
  </section>
</template>

<style scoped></style>
