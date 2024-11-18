<script setup lang="ts">
import ForgeInput from './ForgeInput.vue';
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <Story title="Input">
    <Variant title="Default">
      <ForgeInput v-model="value" label="Default Input" />
    </Variant>
    <Variant title="With Error">
      <ForgeInput
        v-model="value"
        label="Input with Error"
        errorMessage="This field is required."
      />
    </Variant>
  </Story>
</template>
