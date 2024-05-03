<script setup lang="ts">
import { ref } from "vue";
import DeleteMenuOptions from "@/common/MenuOption/DeleteMenuOptions.vue";
import { RouterLink } from "vue-router";

const showCreatePost = ref(false);
const switchCreatePost = () => {
  showCreatePost.value = !showCreatePost.value;
};

const handleSubmitCreateComment = () => {
  console.log("first");
};
</script>

<template>
  <button class="hover:underline" @click="() => switchCreatePost()">
    <i class="ri-discuss-line"></i>
  </button>

  <section
    v-if="showCreatePost"
    class="w-[100dvw] h-[100dvh] bg-black/50 fixed top-0 left-0 z-10 grid place-items-center transition-all"
  >
    <section class="block-module container-medium relative">
      <header class="flex gap-4 items-center justify-between w-full pb-3">
        <section class="flex gap-4 items-center">
          <RouterLink
            :to="{ name: 'profile', params: { email: 'ejemplo@ejemplo.com' } }"
          >
            <img
              src="../../static/profile-small-1.webp"
              alt="user profile"
              class="w-12 h-12 object-cover rounded-full"
            />
          </RouterLink>
          <p>
            <RouterLink
              class="block font-semibold hover:underline text-ellipsis text-nowrap overflow-hidden max-w-28 sm:max-w-none"
              :to="{
                name: 'profile',
                params: { email: 'ejemplo@ejemplo.com' },
              }"
              >Name User</RouterLink
            >
            <span class="block font-light text-xs">2 hours ago</span>
          </p>
        </section>
        <button
          @click="() => switchCreatePost()"
          class="text-red-500 hover:underline text-2xl"
        >
          <i class="ri-close-line"></i>
        </button>
      </header>
      <main
        class="min-h-[calc(100vh-250px)] sm:min-h-full sm:max-h-96 scrollbar-1 overflow-y-auto"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          laboriosam expedita nesciunt fuga. Minima similique corporis, saepe
          modi, accusamus consequatur quod maxime quidem officiis eos
          consectetur veritatis dignissimos doloremque.
        </p>
        <!-- <section class="mt-4 w-full min-h-60 max-h-96 rounded-md overflow-hidden">
          <img
            src="../../static/post-1.webp"
            alt="post-1"
            class="w-full h-full object-cover"
          />
        </section> -->
        <section
          class="mt-4 w-full min-h-60 max-h-96 rounded-md overflow-hidden grid gap-2 grid-cols-5 grid-rows-3"
        >
          <img
            src="../../static/post-1.webp"
            alt="post-1"
            class="w-full h-full object-cover col-span-3 row-span-3"
          />
          <img
            src="../../static/post-1.webp"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
          <img
            src="../../static/post-1.webp"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
          <img
            src="../../static/post-1.webp"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
        </section>
        <!-- aqui vienen los comentarios del post -->
        <section class="mt-4 text-base px-4 py-2 space-y-4">
          <h3
            class="font-semibold text-center text-lg pb-3 border-b-2 border-neutral-800"
          >
            Comments
          </h3>
          <section
            v-for="i in 10"
            class="flex gap-4 items-center justify-between w-full"
          >
            <section class="flex gap-4 items-center">
              <p>
                <RouterLink
                  class="block font-semibold hover:underline text-ellipsis text-nowrap overflow-hidden max-w-16 sm:max-w-24 lg:max-w-none"
                  :to="{
                    name: 'profile',
                    params: { email: 'ejemplo@ejemplo.com' },
                  }"
                  >Name User</RouterLink
                >
                <span class="block font-light text-base"
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident quam laudantium, minima excepturi deleniti ullam
                  suscipit delectus quidem. Voluptates, rem!</span
                >
              </p>
            </section>
            <DeleteMenuOptions />
          </section>
          <button
            class="text-center mt-8 w-full hover:underline hover:text-red-500 transition-all text-lg"
          >
            View more
          </button>
        </section>
      </main>
      <footer class="pt-3">
        <FormKit
          id="form_comment"
          @submit="handleSubmitCreateComment"
          type="form"
          submit-label="Comentar"
        >
          <FormKit
            type="textarea"
            name="comment"
            placeholder="Comment..."
            autocomplete="off"
            validation="length:6:100"
            :classes="{
              input: 'mb-2 max-h-24 overflow-y-auto scrollbar-1 text-base',
            }"
            :validation-messages="{
              length: 'Text must be between 6 and 100 characters',
            }"
            validation-visibility="live"
          />
        </FormKit>
      </footer>
    </section>
  </section>
</template>

<style scoped></style>
