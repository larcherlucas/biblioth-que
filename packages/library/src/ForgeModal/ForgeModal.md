# ForgeModal

A lightweight modal component to display content overlaying the main screen.

## Usage

```vue
<ForgeModal>
  <template #trigger>Click Here to Open</template>
  <h2>Welcome!</h2>
  <p>This is some content inside the modal.</p>
  <template #close>Close Me</template>
</ForgeModal>
Slots
Slot Name	Description
default	Content to display in the modal body.
trigger	Custom content for the button to open the modal.
close	Custom content for the close button.


---

### 2. **ForgeInput**

#### Dossier `ForgeInput` :
- **Fonctionnalité** : Un champ de saisie configurable avec gestion des erreurs et un label personnalisable.

---

##### **ForgeInput.vue** :
```vue
<script setup lang="ts">
defineProps({
  label: { type: String, default: 'Enter Text' },
  modelValue: { type: String, required: true },
  errorMessage: { type: String, default: '' },
});

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
.error {
  color: red;
  font-size: 12px;
}
</style>
