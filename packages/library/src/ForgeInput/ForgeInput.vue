<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  label: { type: String, default: 'Enter Text' },
  modelValue: { type: String, required: true },
  errorMessage: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};
</script>

<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input :value="modelValue" @input="updateValue" />
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
label {
  font-weight: bold;
  font-size: 14px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.error {
  color: red;
  font-size: 12px;
}
</style>
