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

  const currentSize = useModel(props, 'modelValue')
</script>

<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in items"
          :key="size?.id"
          class="diameter__input"
          :class="`diameter__input--${size?.id}`"
        >
          <input
            v-model="currentSize"
            type="radio"
            name="diameter"
            :value="size?.id"
            :checked="size?.id === modelValue"
            class="visually-hidden"
          />
          <span>{{ size?.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/ds-system/ds.scss';
  @import '@/assets/scss/mixins/mixins.scss';

  .content__diameter {
    width: 375px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .diameter__input {
    margin-right: 10%;
    margin-bottom: 20px;
    padding-top: 5px;
    padding-bottom: 5px;

    cursor: pointer;

    span {
      @include r-s16-h19;

      position: relative;

      padding-left: 44px;

      &::before {
        @include p_center_v;

        width: 36px;
        height: 36px;

        content: '';
        transition: 0.3s;

        border-radius: 50%;
        background-color: $green-100;
        background-image: url('@/assets/img/diameter.svg');
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &:nth-child(3n) {
      margin-right: 0;
    }

    &--small {
      span::before {
        background-size: 36px;
      }
    }

    &--normal {
      span::before {
        background-size: 36px;
      }
    }

    &--big {
      span::before {
        background-size: 100%;
      }
    }

    &:hover {
      span::before {
        box-shadow: $shadow-regular;
      }
    }

    input {
      &:checked + span::before {
        box-shadow: $shadow-large;
      }
    }
  }
</style>
