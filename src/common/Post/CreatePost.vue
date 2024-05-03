<script setup lang="ts">
import type { Client_Post } from "@/types/post";
import { reset } from "@formkit/core";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { createPost } from "@/services/post";

// props
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});
// states
const showCreatePost = ref(false);
const switchCreatePost = () => {
  showCreatePost.value = !showCreatePost.value;
};
// preview image
const previewImageUrls = ref<string[]>([]);
const previewImage = (e: Event) => {
  previewImageUrls.value = [];
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const readerEvent = event as ProgressEvent<FileReader>;
      const readerResult = readerEvent.target?.result;
      if (readerResult === null || typeof readerResult !== "string") return;
      previewImageUrls.value.push(readerResult);
    };
    reader.readAsDataURL(files[i]);
  }
};
// functions
const handleSubmitCreatePost = async (
  newPostData: Client_Post
): Promise<void> => {
  // validation
  if (newPostData.content === "" && newPostData.images.length === 0) {
    alert("both fields cannot be empty");
    return;
  }
  if (newPostData.images.length >= 5) {
    previewImageUrls.value = [];
    reset("form_create_post");
    alert("Max 4 images");
    return;
  }
  // to firebase
  const resutl = await createPost(newPostData)
  if (resutl.error) {
    alert(resutl.message);
    return;
  }
  // reset
  previewImageUrls.value = [];
  reset("form_create_post");
  showCreatePost.value = false;
  alert("Post created");
};
</script>

<template>
  <section class="block-module flex gap-4">
    <RouterLink
      :to="{ name: 'profile', params: { email: props.userData?.email } }"
    >
      <img
        :src="props.userData?.profile_image"
        alt="user profile"
        class="w-12 object-cover rounded-full"
      />
    </RouterLink>
    <form
      @submit.prevent
      class="flex flex-1 relative z-0"
      @click="() => switchCreatePost()"
    >
      <input
        type="text"
        class="w-full p-2 bg-neutral-100 shadow-xl rounded-full text-sm px-4 placeholder:text-neutral-500 outline-none"
        readonly
        placeholder="Say, Something..."
      />
      <button
        type="submit"
        class="absolute right-0 inset-y-0 my-2 mr-2 py-2 px-6 sm:px-8 bg-red-500 text-neutral-50 text-xs hover:bg-neutral-800 transition-all duration-300 rounded-full uppercase leading-none font-bold"
      >
        share
      </button>
    </form>
  </section>

  <!-- FORMULARIO -->

  <div
    v-if="showCreatePost"
    class="w-[100dvw] h-[100dvh] bg-black/50 fixed top-0 left-0 z-10 grid place-items-center transition-all"
  >
    <FormKit
      id="form_create_post"
      @submit="handleSubmitCreatePost"
      type="form"
      form-class="$reset w-full flex flex-col container-medium p-12 rounded-md bg-white relative"
      :submit-attrs="{
        inputClass: 'bg-red-500 text-neutral-50 px-2 py-2 shadow-xl block mt-2',
      }"
      submit-label="Create post"
    >
      <button
        type="button"
        class="absolute top-2 right-3 text-2xl text-red-500"
        @click="() => switchCreatePost()"
      >
        <i class="ri-close-line"></i>
      </button>
      <h3 class="text-2xl text-center font-bold mb-8">Create post</h3>
      <FormKit
        type="textarea"
        name="content"
        placeholder="Content..."
        value=""
        autocomplete="off"
        validation="length:0:100"
        :validation-messages="{
          length: 'Content must be between 0 and 100 characters',
        }"
        :classes="{
          input: 'max-h-40 shadow-lg',
        }"
        validation-visibility="live"
      />
      <FormKit
        type="file"
        label="Choose your images"
        name="images"
        accept="image/*"
        @change="previewImage"
        multiple
        :classes="{
          label:
            'bg-neutral-50 block text-center text-sm text-neutral-500 w-full p-2 shadow-md hover:cursor-pointer hover:bg-neutral-100 mt-2',
          input: 'hidden',
        }"
      />
      <article>
        <section
          v-if="previewImageUrls.length === 1"
          class="mt-4 w-full min-h-60 max-h-96 rounded-md overflow-hidden"
        >
          <img
            :src="previewImageUrls[0]"
            alt="post-1"
            class="w-full h-full object-cover"
          />
        </section>
        <section
          v-if="previewImageUrls.length > 1"
          class="mt-4 w-full min-h-60 max-h-96 rounded-md overflow-hidden grid gap-2 grid-cols-5 grid-rows-3"
        >
          <img
            v-if="previewImageUrls[0]"
            :src="previewImageUrls[0]"
            alt="post-1"
            class="w-full h-full object-cover col-span-3 row-span-3"
          />
          <img
            v-if="previewImageUrls[1]"
            :src="previewImageUrls[1]"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
          <img
            v-if="previewImageUrls[2]"
            :src="previewImageUrls[2]"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
          <img
            v-if="previewImageUrls[3]"
            :src="previewImageUrls[3]"
            alt="post-1"
            class="w-full h-full object-cover col-span-2 row-span-1"
          />
        </section>
      </article>
      <p class="text-center mt-2">Max 4 images</p>
    </FormKit>
  </div>
</template>

<style scoped></style>
