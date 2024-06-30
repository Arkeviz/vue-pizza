<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import SidebarLayout from '@/layouts/SidebarLayout.vue'

  const route = useRoute()

  const routeName = computed(() => route.name)
</script>

<template>
  <SidebarLayout>
    <template #sidebar>
      <RouterLink
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'orders' }"
        :to="{ name: 'orders' }"
      >
        История заказов
      </RouterLink>
      <RouterLink
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'profile' }"
        :to="{ name: 'profile' }"
      >
        Мои данные
      </RouterLink>
    </template>

    <RouterView />
  </SidebarLayout>
</template>
