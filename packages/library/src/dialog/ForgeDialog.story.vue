<script setup lang="ts">
import ForgeDialog from './ForgeDialog.vue'
</script>

<template>
  <Story title="Dialog">
    <Variant title="Default">
      <ForgeDialog title="My Dialog" description="This is the description of my Dialog." />
    </Variant>
    <Variant title="WithSlots">
      <ForgeDialog>
        <template #triggerText>
          Open Dialog <span>🚀</span>
        </template>
        <template #title>
          <span style="font-size: 24px; font-weight: bold; color: tomato;">My Dialog</span>
        </template>
        <h3>Welcome to this awesome dialog! 🎉</h3>
        <p>This is a multi-line description showing off some cool features.</p>
        <ul>
          <li>✨ First amazing point</li>
          <li>🚀 Second incredible feature</li>
          <li>🎨 Third awesome capability</li>
        </ul>
        <p>Feel free to explore everything this dialog has to offer!</p>
        <template #closeText>
          Close
        </template>
      </ForgeDialog>
    </Variant>
  </Story>
</template>