<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
// types
import type { Client_AuthLoginUser } from "@/types/auth";
import { APP_STATUS } from "@/enums/app";

// router
const router = useRouter();
// stores
const authStore = useAuthStore();
// app status
const appStatus = ref(APP_STATUS.IDLE);
// functions
const handleSubmitLogin = async (
  loginData: Client_AuthLoginUser
): Promise<void> => {
  appStatus.value = APP_STATUS.LOADING;
  const result = await authStore.loginUser(loginData);
  if (result.error) {
    appStatus.value = APP_STATUS.ERROR;
    return console.log(result.message);
  }
  appStatus.value = APP_STATUS.SUCCESS;
  router.push({ name: "home" });
};
</script>

<template>
  <section class="bg-red-500">
    <FormKit
      id="form_login"
      type="form"
      @submit="handleSubmitLogin"
      submit-label="Login"
      form-class="container py-4 flex flex-col sm:flex-row items-center gap-8 w-full justify-between"
      :submit-attrs="{
        inputClass: 'btn-2',
        disabled: appStatus === APP_STATUS.LOADING,
      }"
      validation-visibility="submit"
    >
      <FormKit
        type="email"
        name="email"
        autocomplete="off"
        placeholder="Email"
        validation="required|email|length:6:30"
        :classes="{
          message: 'text-red-500 bg-neutral-50',
          input:
            '$reset text-neutral-50 bg-transparent placeholder:text-neutral-200 placeholder:text-sm focus:outline-none w-full py-2 px-4 border-b border-neutral-200 w-full',
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
          message: 'text-red-500 bg-neutral-50',
          input:
            '$reset text-neutral-50 bg-transparent placeholder:text-neutral-200 placeholder:text-sm focus:outline-none w-full py-2 px-4 border-b border-neutral-200 w-full',
        }"
        :validation-messages="{
          required: 'Password is required',
          length: 'Password must be between 6 and 30 characters',
        }"
        validation-visibility="submit"
      />
    </FormKit>
  </section>
</template>

<style scoped></style>
