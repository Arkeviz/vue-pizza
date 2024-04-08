<script setup>
  import { DATA_TRANSFER_PAYLOAD } from '@/common/constants'

  const emit = defineEmits(['drop'])

  function onDrop({ dataTransfer }) {
    if (!dataTransfer) {
      return
    }

    const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
    if (!payload) return

    const transferData = JSON.parse(dataTransfer.getData(DATA_TRANSFER_PAYLOAD))
    emit('drop', transferData)
  }
</script>

<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
