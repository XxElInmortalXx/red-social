<script setup lang="ts">
import { ref } from "vue";

// props
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});
// states
const showEditProfile = ref(false);
const switchEditProfile = () => {
  showEditProfile.value = !showEditProfile.value;
};

const handleSubmitEditPost = (email: string) => {
  console.log(email);
};
</script>

<template>
  <button
    @click="() => switchEditProfile()"
    class="block w-full font-bolf text-lg text-center hover:underline"
  >
    Edit Profile
  </button>

  <!-- FORMULARIO EDIT -->
  <div
    v-if="showEditProfile"
    class="w-[100dvw] h-[100dvh] bg-black/50 fixed top-0 left-0 z-10 grid place-items-center transition-all"
  >
    <FormKit
      id="form_create_post"
      @submit="() => handleSubmitEditPost(props.userData?.email)"
      type="form"
      form-class="$reset w-full flex flex-col container-medium p-12 rounded-md bg-white relative"
      :submit-attrs="{
        inputClass: 'bg-red-500 text-neutral-50 px-2 py-2 shadow-xl block mt-2',
      }"
      submit-label="Edit Profile"
    >
      <button
        type="button"
        class="absolute top-2 right-3 text-2xl text-red-500"
        @click="() => switchEditProfile()"
      >
        <i class="ri-close-line"></i>
      </button>
      <h3 class="text-2xl text-center font-bold mb-8">Edit Profile</h3>
      <div class="grid grid-cols-2 gap-4">
        <section>
          <FormKit
            type="file"
            label="Image Profile..."
            name="imageProfile"
            multiple
            :classes="{
              label:
                'bg-neutral-50 block text-center text-sm text-neutral-500 w-full p-2 shadow-md hover:cursor-pointer hover:bg-neutral-100',
              input: 'hidden',
            }"
          />
          <article>
            <img
              :src="props.userData?.profile_image"
              alt="post-1"
              class="w-full h-full object-cover mt-2 max-h-48 object-center"
            />
          </article>
        </section>
        <section>
          <FormKit
            type="file"
            label="Image Banner..."
            name="imageBanner"
            multiple
            :classes="{
              label:
                'bg-neutral-50 block text-center text-sm text-neutral-500 w-full p-2 shadow-md hover:cursor-pointer hover:bg-neutral-100',
              input: 'hidden',
            }"
          />
          <article>
            <img
              :src="props.userData?.cover_image"
              alt="post-1"
              class="w-full h-full object-cover mt-2 max-h-48 object-center"
            />
          </article>
        </section>
      </div>
      <FormKit
        type="text"
        name="name"
        placeholder="Name Profile..."
        :value="props.userData?.displayName"
        autocomplete="off"
        validation="length:6:50"
        :validation-messages="{
          length: 'Content must be between 6 and 50 characters',
        }"
        :classes="{
          input: 'shadow-lg mt-2',
        }"
        validation-visibility="live"
      />
      <FormKit
        type="textarea"
        name="bio"
        placeholder="Bio Profile..."
        :value="props.userData?.bio"
        autocomplete="off"
        validation="length:20:500"
        :validation-messages="{
          length: 'Content must be between 20 and 500 characters',
        }"
        :classes="{
          input: 'max-h-40 shadow-lg mt-2',
        }"
        validation-visibility="live"
      />
    </FormKit>
  </div>
</template>

<style scoped></style>
