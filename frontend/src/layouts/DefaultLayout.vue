<script setup>
  import DefaultHeader from './DefaultHeader.vue'
</script>

<template>
  <div class="default-layout">
    <DefaultHeader />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .default-layout {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
</style>
