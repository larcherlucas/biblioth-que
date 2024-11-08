<script setup lang="ts">
import ForgeAvatar from './ForgeAvatar.vue'
</script>

<template>
  <Story title="Avatar">
    <Variant title="Default">
      <ForgeAvatar
        name="Sybren Willemot"
        src="https://avatars.githubusercontent.com/u/16015740?v=4"
        @status-change="(e) => console.log(e.status)"
      />
    </Variant>
    <Variant title="No Correct Src">
      <ForgeAvatar
        name="Sybren Willemot"
        src="badUrl"
      />
    </Variant>
  </Story>
</template>