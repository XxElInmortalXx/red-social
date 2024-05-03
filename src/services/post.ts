import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { db, storage } from "./firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import imageCompression from "browser-image-compression";
import { uid } from "uid";
// types
import type { Client_Post, Server_Post } from "@/types/post";
import type { firebaseResponse } from "@/types/services";

// stores
const authStore = useAuthStore();

// functions
export async function getPosts(): Promise<firebaseResponse> {
  try {
    const q = query(
      collection(db, "posts"),
      orderBy("created_at")
      // limit(limitDoc),
      // startAfter(lastDoc)
    );
    const querySnapshot = await getDocs(q);
    return {
      error: false,
      message: "Get posts success",
      data: querySnapshot,
    };
  } catch (error) {
    return { error: true, message: "Get posts failed", data: [] };
  }
}

export async function createPost(
  newPostData: Client_Post
): Promise<firebaseResponse> {
  const images = [];
  if (newPostData.images.length > 0) {
    for (let i = 0; i < newPostData.images.length; i++) {
      const imagePost = newPostData.images[i].file;
      try {
        const compressedFile = await imageCompression(imagePost, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const fileName = uid() + "." + imagePost.name.split(".").pop();
        const sRef = ref(storage, `posts_images/${fileName}`);
        const snapshot = await uploadBytes(sRef, compressedFile);
        const url = await getDownloadURL(snapshot.ref);
        images.push(url);
      } catch (error) {
        return { error: true, message: "Image compression failed" };
      }
    }
  }

  try {
    // add new documment with a generated id
    const newPostRef = doc(collection(db, "posts"));
    // new post
    const post: Server_Post = {
      id: newPostRef.id,
      author: {
        name: authStore.authUser?.displayName,
        email: authStore.authUser?.email,
        image: authStore.authUser?.profile_image,
      },
      content: newPostData.content,
      images,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // set post with id in db
    await setDoc(newPostRef, post);
    return { error: false, message: "Post created successfully" };
  } catch (error) {
    return { error: true, message: "Post creation failed" };
  }
}

export async function editPost(
  postId: string,
  newPostData: Client_Post,
  oldImages: string[]
): Promise<firebaseResponse> {
  // delete old images
  console.log(oldImages.length)
  console.log(newPostData.images.length)
  if (oldImages.length > 0 && newPostData.images.length > 0) {
    console.log("pasa por aqui")
    for (let i = 0; i < oldImages.length + 1; i++) {
      try {
        const nameImage = oldImages[i].substring(oldImages[i].indexOf("%") + 3,oldImages[i].indexOf("?"));
        console.log(nameImage)
        // const imageRef = ref(storage, `posts_images/${nameImage}`);
        // await deleteObject(imageRef);
        return { error: false, message: "Image deleted successfully" };
      } catch (error) {
        console.log(error)
        return { error: true, message: "Image deleted failed" };
      }
    }
  }
  return { error: false, message: "Image deleted successfully" };
  // images
  const images = [];
  if (newPostData.images.length > 0) {
    for (let i = 0; i < newPostData.images.length; i++) {
      const imagePost = newPostData.images[i].file;
      try {
        const compressedFile = await imageCompression(imagePost, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const fileName = uid() + "." + imagePost.name.split(".").pop();
        const sRef = ref(storage, `posts_images/${fileName}`);
        const snapshot = await uploadBytes(sRef, compressedFile);
        const url = await getDownloadURL(snapshot.ref);
        images.push(url);
      } catch (error) {
        return { error: true, message: "Image compression failed" };
      }
    }
  }
  if (oldImages.length > 0) {
    images.push(...oldImages);
  }
  try {
    const postRef = doc(db, "posts", postId);
    const post: Server_Post = {
      id: postId,
      author: {
        name: authStore.authUser?.displayName,
        email: authStore.authUser?.email,
        image: authStore.authUser?.profile_image,
      },
      content: newPostData.content,
      images,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await updateDoc(postRef, post);
    return { error: false, message: "Post updated successfully" };
  } catch (error) {
    return { error: true, message: "Post update failed" };
  }
}

// export async function deletePost(postId: string): Promise<firebaseResponse> {
//   try {
//     await deleteDoc(doc(db, "posts", postId));
//     return { error: false, message: "Post deleted successfully" };
//   } catch (error) {
//     return { error: true, message: "Post deletion failed" };
//   }
// }
