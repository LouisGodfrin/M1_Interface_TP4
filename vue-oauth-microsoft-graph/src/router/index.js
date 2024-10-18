// Router configuration

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ConversationsPage from '../pages/ConversationsPage.vue';
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard, if the user is not loggin, he can't go to conversation page
router.beforeEach((to, from, next) => {
  
  // Verify if the route require a guard
  if (to.matched.some(record => record.meta.requiresAuth)) 
  {
      // If the requirement of the sigin is equal to false, so if the user is not login
      if (!store.state.user) 
      {
        // Go to HomePage
        alert("You are not login, retry after being login")
        next({ path: '/' });
      } 
      else 
      {
        // else access to conversation page
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
