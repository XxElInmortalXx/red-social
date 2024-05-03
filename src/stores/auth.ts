import { defineStore } from "pinia";
import { ref } from "vue";
// types
import type {
  Client_AuthLoginUser,
  Client_AuthRegisterUser,
  Client_User,
} from "@/types/auth";
// firebase
import { auth, db } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import type { firebaseResponse } from "@/types/services";

// store
export const useAuthStore = defineStore("auth", () => {
  const authUser = ref<Client_User | null>(null);

  // functions
  const registerUser = async (
    formRegisterUser: Client_AuthRegisterUser
  ): Promise<firebaseResponse> => {
    // registrar usuario
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formRegisterUser.email,
      formRegisterUser.password
    );
    if (!userCredential.user) {
      return { error: true, message: "Register failed" };
    }
    // actualizar las credenciales de auth
    await updateProfile(userCredential.user, {
      displayName: formRegisterUser.displayName,
      photoURL: "/default-profile.jpg",
    });
    // guardar a la base de datos
    const docRef = await addDoc(collection(db, "users"), {
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      gender: formRegisterUser.gender,
      profile_image: "/default-profile.jpg",
      cover_image: "/default-cover.jpg",
      bio: "Hello, I am using RedSocial!",
    });
    if (!docRef) {
      return { error: true, message: "Register to database failed" };
    }
    return { error: false, message: "Register success" };
  };

  const loginUser = async (
    formLoginUser: Client_AuthLoginUser
  ): Promise<firebaseResponse> => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formLoginUser.email,
        formLoginUser.password
      );
      return { error: false, message: "Login success" };
    } catch (error) {
      return { error: true, message: "Login failed" };
    }
  };

  const logout = async (): Promise<firebaseResponse> => {
    try {
      await signOut(auth);
      return { error: false, message: "Logout success" };
    } catch (error) {
      return { error: true, message: "Logout failed" };
    }
  };

  // return
  return {
    authUser,
    registerUser,
    loginUser,
    logout,
  };
});
