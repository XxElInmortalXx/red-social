<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { APP_STATUS } from "@/enums/app";
// types
import type { Client_AuthRegisterUser } from "@/types/auth";

// stores
const authStore = useAuthStore();
// router
const router = useRouter();
// app status
const appStatus = ref(APP_STATUS.IDLE);
// functions
const handleSubmitRegister = async (
  registerData: Client_AuthRegisterUser
): Promise<void> => {
  appStatus.value = APP_STATUS.LOADING;
  const result = await authStore.registerUser(registerData);
  if (result.error) {
    appStatus.value = APP_STATUS.ERROR;
    return console.log(result.message);
  }
  appStatus.value = APP_STATUS.SUCCESS;
  router.push({ name: "home" });
};
</script>

<template>
  <FormKit
    id="form_register"
    @submit="handleSubmitRegister"
    type="form"
    submit-label="Create account"
    form-class="p-8 flex flex-col gap-8"
    :submit-attrs="{
      inputClass: 'mt-4 btn-1',
    }"
  >
    <FormKit
      type="text"
      name="displayName"
      autocomplete="off"
      placeholder="Display name"
      validation="required|length:4:30"
      :classes="{
        message: 'text-red-500 bg-red-100 border-l-4 border-red-800',
      }"
      :validation-messages="{
        required: 'Username is required',
        length: 'Username must be between 4 and 30 characters',
      }"
      validation-visibility="submit"
    />
    <FormKit
      type="email"
      name="email"
      autocomplete="off"
      placeholder="Email"
      validation="required|email|length:6:30"
      :classes="{
        message: 'text-red-500 bg-red-100 border-l-4 border-red-800',
      }"
      :validation-messages="{
        required: 'Email is required',
        length: 'Email must be between 6 and 30 characters',
        email: 'Email must be valid',
      }"
      validation-visibility="submit"
    />
    <FormKit
      type="password"
      name="password"
      autocomplete="off"
      placeholder="Password"
      validation="required|length:6:30"
      :classes="{
        message: 'text-red-500 bg-red-100 border-l-4 border-red-800',
      }"
      :validation-messages="{
        required: 'Password is required',
        length: 'Password must be between 6 and 30 characters',
      }"
      validation-visibility="submit"
    />
    <FormKit
      type="select"
      name="gender"
      autocomplete="off"
      :options="{ hombre: 'Hombre', mujer: 'Mujer', otro: 'Otro...' }"
      validation="required|is:hombre,mujer"
      :classes="{
        message: 'text-red-500 bg-red-100 border-l-4 border-red-800',
        input: 'text-neutral-800 default:ring-2',
        option: '$reset text-neutral-500',
      }"
      :validation-messages="{
        required: 'Gender is required',
        is: 'Your are homosexual?...',
      }"
      validation-visibility="submit"
    />
  </FormKit>
</template>

<style scoped></style>
