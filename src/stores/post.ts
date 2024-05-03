import type { Server_Post } from "@/types/post"
import { defineStore } from "pinia"
import { ref } from "vue"

export const usePostStore = defineStore("post", () => {
    const posts = ref<Server_Post[]>([])
    const postsProfile = ref<Server_Post[]>([])

    return { posts, postsProfile }
})

