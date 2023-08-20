import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'TaskList',
      component: () => import('@/views/TaskList.vue')
    },
    {
      path: '/task/:id',
      name: 'TaskDetails',
      component: () => import('@/components/TaskDetails.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/tasks'
    }
  ]
})

export default router
