<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./services/firebase";
import { useAuthStore } from "@/stores/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Client_User } from "./types/auth";

// stores
const authStore = useAuthStore();

// para verificar si está logeado o no
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // getUser
      if (authStore.authUser !== null) return
      getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      ).then((snapshot) => {
        authStore.authUser = snapshot.docs[0].data() as Client_User;
      });
      console.log("is login: se cargo el store")
    } else {
      // authStore.authUser = null;
      console.log("is not login: se vació el store")
    }
  });
});
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
