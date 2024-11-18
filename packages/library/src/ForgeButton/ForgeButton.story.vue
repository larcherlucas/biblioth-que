<script setup lang="ts">
import ForgeButton from './ForgeButton.vue';

function handleClick(message: string) {
  alert(message);
}
</script>

<template>
  <Story title="Button">
    <Variant title="Default Button">
      <ForgeButton @click="handleClick('Default Button clicked')">
        Default Button
      </ForgeButton>
    </Variant>

    <Variant title="Primary Button">
      <ForgeButton variant="primary" @click="handleClick('Primary Button clicked')">
        Primary Button
      </ForgeButton>
    </Variant>

    <Variant title="Secondary Button">
      <ForgeButton variant="secondary" @click="handleClick('Secondary Button clicked')">
        Secondary Button
      </ForgeButton>
    </Variant>

    <Variant title="Danger Button">
      <ForgeButton variant="danger" @click="handleClick('Danger Button clicked')">
        Danger Button
      </ForgeButton>
    </Variant>

    <Variant title="Disabled Button">
      <ForgeButton disabled>
        Disabled Button
      </ForgeButton>
    </Variant>
  </Story>
</template>
