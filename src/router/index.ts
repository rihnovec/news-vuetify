import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import PostsPage from '@/views/PostsPage.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsPage,
    },
  ],
})

export default router
