<script setup lang="ts">
import { useShowModalStore } from "@/stores/showModal"

// stores
const showModalStore = useShowModalStore()

const switchModalNotifications = () => {
    showModalStore.setActiveModal("search", null)
};

const handleSubmitSearch = () => {
  console.log("first");
};
</script>

<template>
  <button
    @click="switchModalNotifications"
    :class="{
      'group lg:hidden lg:justify-center lg:items-center lg:gap-2': true,
      'text-red-500': showModalStore.showModal[6].show,
      'text-neutral-800': !showModalStore.showModal[6].show,
    }"
  >
    <i class="ri-search-line group-hover:text-red-500 transition-all"></i>
    <p
      class="hidden sm:block leading-none font-medium text-base group-hover:text-red-500 group-hover:underline group-hover:cursor-pointer"
    >
      Search
    </p>
  </button>
  <section
    :class="{
      'absolute border-y-2 border-red-500 top-[63px] lg:top-[52px] inset-x-0 w-full transition-all bg-white shadow-xl min-w-60 text-base space-y-4 overflow-y-auto scrollbar-1 lg:hidden': true,
      'h-0 border-none': !showModalStore.showModal[6].show,
      'h-auto max-h-80 py-4': showModalStore.showModal[6].show,
    }"
  >
    <FormKit
      id="form_search_mobile"
      @submit="handleSubmitSearch"
      type="form"
      form-class="flex gap-2 lg:hidden container items-center justify-between min-w-[300px]"
      :submit-attrs="{
        inputClass: 'rounded-full',
      }"
      submit-label="Search"
    >
      <FormKit
        type="search"
        name="search"
        autocomplete="off"
        placeholder="Search..."
        :classes="{
          input: 'w-full p-2 shadow-md rounded-full bg-neutral-100 border-b-0',
        }"
      />
    </FormKit>
  </section>
</template>

<style scoped></style>
