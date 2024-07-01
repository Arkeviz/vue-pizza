<script setup>
  import AppPopup from '@/common/components/popup/AppPopup.vue'
  import AppPopupTitle from '@/common/components/popup/AppPopupTitle.vue'
  import AppPopupButton from '@/common/components/popup/AppPopupButton.vue'
</script>

<template>
  <AppPopup>
    <RouterLink :to="{ name: 'orders' }" class="close">
      <span class="visually-hidden">Закрыть поп-ап</span>
    </RouterLink>

    <AppPopupTitle> Спасибо за заказ </AppPopupTitle>

    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>

    <AppPopupButton>
      <RouterLink :to="{ name: 'orders' }" class="button">
        Отлично, я жду!
      </RouterLink>
    </AppPopupButton>
  </AppPopup>
</template>
