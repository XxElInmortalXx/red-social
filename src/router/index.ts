import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/auth/AuthView.vue";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout.vue";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth",
      component: AuthView,
      meta: { requiresNotBeingAuth: true },
    },
    {
      path: "/home",
      component: HomeLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/home/HomeView.vue"),
        },
        {
          path: "profile",
          component: () => import("../layouts/ProfileLayout/ProfileLayout.vue"),
          children: [
            {
              path: ":email",
              name: "profile",
              component: () => import("../views/profile/ProfileView.vue"),
            },
            {
              path: ":email/friends",
              name: "profile-friends",
              component: () =>
                import("../views/profile/ProfileFriendsView.vue"),
            },
          ],
        },
      ],
    },
  ],
});

// guard to navigation (middleware route)
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresNotBeingAuth = to.matched.some(
    (record) => record.meta.requiresNotBeingAuth
  );

  if (requiresAuth) {
    try {
      await authenticateUser();
      next();
      return;
    } catch (error) {
      next({ name: "auth" });
      return;
    }
  } else if (requiresNotBeingAuth) {
    try {
      await authenticateUser();
      next({ name: "home" });
      return;
    } catch (error) {
      next();
      return;
    }
  } else {
    next();
    return;
  }
});

// helper function to authenticate user
async function authenticateUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

export default router;
