<script setup lang="ts">
import { ForgeAvatar } from 'tiny-forge-ui'
</script>

<template>
  <div>
    <ForgeAvatar
      name="Sybren Willemot"
      src="https://avatars.githubusercontent.com/u/16015740?v=4"
      @status-change="(e) => console.log(e.status)"
    />
  </div>
</template>
