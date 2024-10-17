// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ConversationsIndexPage from '../pages/ConversationsIndexPage.vue'; // Créez ce composant

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/conversations',
    name: 'Conversations',
    component: ConversationsIndexPage, // Affiche une page de placeholder pour le moment
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
