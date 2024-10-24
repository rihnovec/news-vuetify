import { createRouter, createWebHistory } from 'vue-router'
import PostsPage from '@/views/PostsPage.vue'

import type { Router } from 'vue-router'
import {AppRouteNames} from '@/typings/enums/AppRouteNames'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: AppRouteNames.HOME,
      component: PostsPage,
    },
    {
      path: '/create',
      name: AppRouteNames.CREATE_POST,
      component: () => import('@/views/NewPostPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: AppRouteNames.NOT_FOUND,
      component: () => import('@/views/Page404.vue'),
    },
  ],
})

export default router
