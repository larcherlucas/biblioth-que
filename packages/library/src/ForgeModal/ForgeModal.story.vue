<script setup lang="ts">
import ForgeModal from './ForgeModal.vue';
</script>

<template>
  <Story title="Modal">
    <Variant title="Default">
      <ForgeModal>
        <h2>Default Modal</h2>
        <p>This is the content inside the modal.</p>
      </ForgeModal>
    </Variant>
    <Variant title="Custom Trigger and Close">
      <ForgeModal>
        <template #trigger>Show Popup 🚀</template>
        <h2>Welcome!</h2>
        <p>Custom modal content is displayed here.</p>
        <template #close>Dismiss</template>
      </ForgeModal>
    </Variant>
  </Story>
</template>
