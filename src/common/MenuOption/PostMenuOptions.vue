<script setup lang="ts">
import { createPost, editPost } from "@/services/post";
import type { Client_Post, Server_Post } from "@/types/post";
import { reset } from "@formkit/core";
import { ref } from "vue";

// props
const props = defineProps<{
  post: Server_Post;
}>();

const showEditPost = ref(false);
const switchEditPost = () => {
  showEditPost.value = !showEditPost.value;
};

// preview image
const previewImageUrls = ref<string[]>(props.post.images);
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
const handleSubmitEditPost = async (
  newPostData: Client_Post
): Promise<void> => {
  // validation
  const oldImages:string[] = newPostData.images.length === 0 ? props.post.images : [];
  if (
    newPostData.content === "" &&
    (newPostData.images.length === 0 || oldImages.length === 0)
  ) {
    alert("both fields cannot be empty");
    return;
  }
  if (newPostData.images.length >= 5) {
    previewImageUrls.value = [];
    reset("form_edit_post");
    alert("Max 4 images");
    return;
  }
  // to firebase
  const resutl = await editPost(props.post.id, newPostData, oldImages);
  if (resutl.error) {
    alert(resutl.message);
    return;
  }
  showEditPost.value = false;
  alert("Post Edited");
};
</script>

<template>
  <section class="relative">
    <button class="text-2xl p-2 peer relative z-0">
      <i class="ri-menu-3-line"></i>
    </button>
    <section
      class="absolute z-10 right-0 h-0 overflow-hidden peer-hover:h-auto hover:h-auto hover:p-4 peer-hover:p-4 transition-all p-0 bg-white shadow-2xl flex flex-col gap-2 min-w-40"
    >
      <button @click="() => switchEditPost()" class="btn-2 font-medium">
        Edit
      </button>
      <button class="btn-1 font-medium">Delete</button>
    </section>
  </section>

  <!-- FORMULARIO EDIT -->
  <div
    v-if="showEditPost"
    class="w-[100dvw] h-[100dvh] bg-black/50 fixed top-0 left-0 z-10 grid place-items-center transition-all"
  >
    <FormKit
      id="form_edit_post"
      @submit="handleSubmitEditPost"
      type="form"
      form-class="$reset w-full flex flex-col container-medium p-12 rounded-md bg-white relative"
      :submit-attrs="{
        inputClass: 'bg-red-500 text-neutral-50 px-2 py-2 shadow-xl block mt-2',
      }"
      submit-label="Edit Post"
    >
      <button
        type="button"
        class="absolute top-2 right-3 text-2xl text-red-500"
        @click="() => switchEditPost()"
      >
        <i class="ri-close-line"></i>
      </button>
      <h3 class="text-2xl text-center font-bold mb-8">Edit post</h3>
      <FormKit
        type="textarea"
        name="content"
        :value="props.post.content"
        placeholder="Content..."
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
    </FormKit>
  </div>
</template>

<style scoped></style>
