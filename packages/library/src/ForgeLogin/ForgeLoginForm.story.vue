<script setup lang="ts">
import ForgeLoginForm from './ForgeLoginForm.vue';

function handleSubmit(formData: any) {
  console.log('Form submitted:', formData);
  alert('Formulaire soumis avec succès !');
}
</script>

<template>
  <Story title="Login Form">
    <Variant title="Default Form">
      <ForgeLoginForm @submit="handleSubmit">
      Default Form
      </ForgeLoginForm>
    </Variant>
    <Variant title="Primary Form">
  <ForgeLoginForm variant="primary" @submit="handleSubmit">
    Primary Form
  </ForgeLoginForm>
</Variant>
  </Story>
</template>