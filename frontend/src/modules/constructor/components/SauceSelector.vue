<script setup lang="ts">
  import { useModel } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
  })

  const currentSauce = useModel(props, 'modelValue')
</script>

<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in items"
      :key="sauce?.id"
      class="radio ingredients__input"
    >
      <input
        v-model="currentSauce"
        type="radio"
        name="sauce"
        :value="sauce?.id"
        :checked="sauce?.id === modelValue"
      />
      <span>{{ sauce?.name }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/ds-system/ds.scss';

  .ingredients__sauce {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    width: 100%;
    margin-bottom: 14px;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-right: 16px;
      margin-bottom: 10px;
    }
  }

  .ingredients__input {
    margin-right: 24px;
    margin-bottom: 10px;
  }
</style>
