export default [
  {
    path: 'orders',
    name: 'orders',
    component: () => import('@/views/user/components/UserOrders.vue'),
  },
  {
    path: 'profile',
    name: 'profile',
    component: () => import('@/views/user/components/UserProfile.vue'),
  },
]
