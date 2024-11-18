<script setup lang="ts">
import { Teleport, ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <div>
    <button @click="isOpen = true"><slot name="trigger">Open Modal</slot></button>
    <Teleport to="body" v-if="isOpen">
      <div class="backdrop" @click.self="isOpen = false">
        <div class="modal-content">
          <slot>
            Default modal content. Customize using slots!
          </slot>
          <button class="close-btn" @click="isOpen = false">
            <slot name="close">Close</slot>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
}
.close-btn {
  margin-top: 20px;
  background: tomato;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
