// Existing imports
import {createRouter, createWebHistory} from "vue-router";
import {auth} from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import peripherals from "./peripherals.js";
import authRoutes from "./authRoutes.js";
import app from "./app.js";
import admin from "@/router/admin.js";

const staticRoutes = [
  peripherals,
  authRoutes,
  app,
  admin
  // Add other static routes here
];

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
});

// Function to check authentication state
const checkAuthState = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

router.beforeEach(async (to, from, next) => {
  const user = await checkAuthState();

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !user) {
    next('/auth/login');
  } else if (to.path === '/auth/login' && user) {
    next('/app/overview');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  // Check if the route requires authentication
  if(to.meta.requiresAuth && !user) {
    next('/auth/login');
  } else if(to.path === '/login' && user) {
    next('/app/overview');
  } else {
    next();
  }
});

// Function to dynamically add a route
export function addDynamicRoute(route) {
  if (!router.hasRoute(route.name)) {
    router.addRoute(route); // Dynamically adds the route
    console.log(`Dynamic route added: ${route.name}`);
  }
}

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
