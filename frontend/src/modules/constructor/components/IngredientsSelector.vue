<script setup lang="ts">
  import { toRef } from 'vue'
  import { MAX_INGREDIENT_COUNT } from '@/common/constants'
  import { getImage } from '@/common/helpers/getImage'
  import AppDrag from '@/common/components/AppDrag.vue'

  const props = defineProps({
    values: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Array,
      default: () => [],
    },
  })

  const emit = defineEmits(['update'])

  const values = toRef(props, 'values')

  const getValue = (ingredient) => values.value[ingredient] ?? 0

  const setValue = (ingredient, count) =>
    emit('update', ingredient, Number(count))

  const incrementValue = (ingredient) =>
    setValue(ingredient, getValue(ingredient) + 1)

  const decrementValue = (ingredient) =>
    setValue(ingredient, getValue(ingredient) - 1)

  const inputValue = (ingredient, count) =>
    setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)))
</script>

<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in items"
        :key="ingredient?.id"
        class="ingredients__item"
      >
        <AppDrag
          :transferred-data="ingredient"
          :draggable="getValue(ingredient.value) < MAX_INGREDIENT_COUNT"
          class="ingredients__item--container"
        >
          <img :src="getImage(ingredient?.image)" :alt="ingredient?.name" />
          <span class="filling" :class="`filling--${ingredient?.value}`">
            {{ ingredient?.name }}
          </span>
        </AppDrag>

        <div class="counter ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="getValue(ingredient.value) === 0"
            @click="decrementValue(ingredient.value)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="getValue(ingredient.value)"
            @input="(event) => inputValue(ingredient.value, event.target.value)"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="getValue(ingredient.value) === MAX_INGREDIENT_COUNT"
            @click="incrementValue(ingredient.value)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/ds-system/ds.scss';
  @import '@/assets/scss/mixins/mixins.scss';

  .ingredients__filling {
    width: 100%;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-bottom: 16px;
    }
  }

  .ingredients__list {
    @include clear-list;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .ingredients__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    width: fit-content;
    min-width: 100px;
    max-width: 110px;
    min-height: 40px;
    margin-right: 17px;
    margin-bottom: 35px;

    img {
      width: 25px;
    }

    &--container {
      display: flex;
      width: 100%;
      align-items: center;
    }
  }

  .ingredients__counter {
    width: 55px;
    margin-top: 10px;
    margin-left: 30px;
  }

  .counter {
    display: flex;

    align-items: center;
    justify-content: space-between;
  }

  .counter__button {
    $el: &;
    $size_icon: 50%;

    position: relative;

    display: block;

    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: 0.3s;

    border: none;
    border-radius: 50%;
    outline: none;

    &--minus {
      background-color: $purple-100;

      &::before {
        @include p_center-all;

        width: $size_icon;
        height: 2px;

        content: '';

        border-radius: 2px;
        background-color: $black;
      }

      &:hover:not(:active):not(:disabled) {
        background-color: $purple-200;
      }

      &:active:not(:disabled) {
        background-color: $purple-300;
      }

      &:focus:not(:disabled) {
        box-shadow: $shadow-regular;
      }

      &:disabled {
        cursor: default;

        &::before {
          opacity: 0.1;
        }
      }
    }

    &--plus {
      background-color: $green-500;

      &::before {
        @include p_center-all;

        width: $size_icon;
        height: 2px;

        content: '';

        border-radius: 2px;
        background-color: $white;
      }

      &::after {
        @include p_center-all;

        width: $size_icon;
        height: 2px;

        content: '';
        transform: translate(-50%, -50%) rotate(90deg);

        border-radius: 2px;
        background-color: $white;
      }

      &:hover:not(:active):not(:disabled) {
        background-color: $green-400;
      }

      &:active:not(:disabled) {
        background-color: $green-600;
      }

      &:focus:not(:disabled) {
        box-shadow: $shadow-regular;
      }

      &:disabled {
        cursor: default;

        opacity: 0.3;
      }
    }

    &--orange {
      background-color: $orange-200;

      &:hover:not(:active):not(:disabled) {
        background-color: $orange-100;
      }

      &:active:not(:disabled) {
        background-color: $orange-300;
      }
    }
  }

  .counter__input {
    @include r-s14-h16;

    box-sizing: border-box;
    width: 22px;
    margin: 0;

    text-align: center;

    color: $black;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: transparent;

    &:focus {
      box-shadow: inset $shadow-regular;
    }
  }

  .filling {
    @include r-s14-h16;

    position: relative;
    display: block;

    padding-left: 5px;

    img {
      @include p_center-v;

      display: block;

      width: 32px;
      height: 32px;

      box-sizing: border-box;
      padding: 4px;

      border-radius: 50%;
    }
  }
</style>
