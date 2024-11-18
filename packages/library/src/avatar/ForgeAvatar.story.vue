<script setup lang="ts">
import ForgeAvatar from './ForgeAvatar.vue'
</script>

<template>
  <Story title="Avatar">
    <Variant title="Default">
      <ForgeAvatar
        name="Lucas Larcher"
        src="https://avatars.githubusercontent.com/u/152268582?v=4"
        @status-change="(e) => console.log(e.status)"
      />
    </Variant>
    <Variant title="No Correct Src">
      <ForgeAvatar
        name="Lucas Larcher"
        src="badUrl"
      />
    </Variant>
  </Story>
</template>