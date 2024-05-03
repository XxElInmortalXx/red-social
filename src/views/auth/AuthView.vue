<script setup lang="ts">
import LoginForm from "@/modules/Auth/LoginForm.vue";
import RegisterForm from "@/modules/Auth/RegisterForm.vue";
</script>

<template>
  <header class="grid grid-cols-1 lg:grid-cols-2 bg-neutral-50">
    <section class="container py-4 flex gap-4 justify-between items-center">
      <img src="/ganex-logo.svg" alt="logo ganex" class="w-28" />
      <p class="text-sm font-medium">
        It’s helps you to connect and share with the people in your life
      </p>
    </section>
    <LoginForm />
  </header>
  <main
    class="flex flex-col lg:flex-row-reverse place-items-center bg-neutral-50"
  >
    <div class="w-full h-full flex-1">
      <section class="container-medium py-8">
        <h1 class="text-3xl text-center font-bold text-red-500 mb-8">
          Create an account
        </h1>
        <div class="shadow-xl">
          <h2 class="font-medium text-neutral-50 text-center py-4 bg-red-500">
            Welcome to Ganex
          </h2>
          <RegisterForm />
          <p class="text-center text-sm pb-8">
            I have read & accepted the
            <a href="#" class="text-red-500">terms of use</a>
          </p>
        </div>
      </section>
    </div>
    <section
      class="bg-red-500 flex-1 w-full min-h-60 lg:min-h-[calc(100vh-72.6px)] max-h-[100vh] grid place-items-center"
    >
      <p
        class="text-neutral-50 text-center max-w-96 text-xl font-bold uppercase"
      >
        Let’s see what’s happening to you and your world. Welcome in Ganex
      </p>
    </section>
  </main>
</template>
