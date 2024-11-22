<script setup lang="ts">
import ForgeSignupForm from './ForgeSignupForm.vue';

function handleSubmit(formData: any) {
  console.log('Form submitted:', formData);
  alert('Formulaire soumis avec succès !');
}
</script>

<template>
  <Story title="Signup Form">
    <Variant title="Default Form">
      <ForgeSignupForm @submit="handleSubmit">
      Default Form
      </ForgeSignupForm>
    </Variant>
    <Variant title="Primary Form">
  <ForgeSignupForm variant="primary" @submit="handleSubmit">
    Primary Form
  </ForgeSignupForm>
</Variant>
  </Story>
</template>