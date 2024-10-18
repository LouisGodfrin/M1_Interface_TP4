// Router configuration

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ConversationsPage from '../pages/ConversationsPage.vue';
import ConversationShowPage from '../pages/ConversationShowPage.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/conversations',
    name: 'Conversations',
    component: ConversationsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/conversations/:id', // Dynamic route with :id
    name: 'ConversationShow',
    component: ConversationShowPage,
    meta: { requiresAuth: true }, // Guard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard, if the user is not loggin, he can't go to conversation page
router.beforeEach((to, from, next) => {
  console.log("Navigating to:", to.path);
  console.log("User state:", store.state.user);

  
  // Verify if the route require a guard
  if (to.matched.some(record => record.meta.requiresAuth)) 
  {
      // If the requirement of the sigin is equal to false, so if the user is not login
      if (!store.state.user) 
      {
        // Go to HomePage
        console.log("Not authenticated, redirecting to home page.");
        alert("You are not login, retry after being login")
        next({ path: '/' });
      } 
      else 
      {
        // else access to conversation page
        console.log("Authenticated, allowing access.");
        next();
      }
  } 
  else 
  {
    // if no guard, let access to any page without login
    next();
  }
});

export default router;
