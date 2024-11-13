<script setup lang="ts">
import { Dialog, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from '@ark-ui/vue'
import type { VNode } from 'vue'

export interface DialogProps extends DialogRootProps {
	title?: string
	description?: string
	triggerText?: string
	closeText?: string
}

const props = withDefaults(defineProps<DialogProps>(), {
  triggerText: 'Open Dialog',
  closeText: 'X',
})
const emits = defineEmits<DialogRootEmits>()

const slots = defineSlots<{
  default: VNode[]
  triggerText: VNode[]
  title: VNode[]
  closeText: VNode[]
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog.Root v-bind:forwarded>
    <Dialog.Trigger>
      <slot name="triggerText">
        {{ triggerText }}
      </slot>
    </Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>
            <slot name="title">
              {{ title }}
            </slot>
          </Dialog.Title>
          <Dialog.Description>
            <slot>
              {{ description }}
            </slot>
          </Dialog.Description>
          <Dialog.CloseTrigger>
            <slot name="closeText">
              {{ closeText }}
            </slot>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>

<style scoped>
[data-scope='dialog'][data-part='backdrop'] {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  inset: 0px;
}

[data-scope='dialog'][data-part='backdrop'][data-state='open'] {
  animation: fadeIn 0.25s ease-out;
}

[data-scope='dialog'][data-part='backdrop'][data-state='closed'] {
  animation: fadeOut 0.2s ease-in;
}

[data-scope='dialog'][data-part='container'] {
  height: 100vh;
  width: 100vw;
  position: fixed;
  inset: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-scope='dialog'][data-part='title'] {
  margin: 0px;
  font-weight: 500;
  color: rgb(26, 21, 35);
  font-size: 17px;
}

[data-scope='dialog'][data-part='description'] {
  margin: 10px 0px 20px;
  color: rgb(111, 110, 119);
  font-size: 15px;
  line-height: 1.5;
}

[data-scope='dialog'][data-part='content'] {
  background-color: white;
  border-radius: 6px;
  box-shadow:
    rgb(14 18 22 / 35%) 0px 10px 38px -10px,
    rgb(14 18 22 / 20%) 0px 10px 20px -15px;
  width: 100%;
  max-width: 450px;
  max-height: 85vh;
  padding: 24px;
  position: relative;
}

[data-scope='dialog'][data-part='content'][data-state='open'] {
  animation: scaleIn 0.3s ease-out;
}

[data-scope='dialog'][data-part='content'][data-state='closed'] {
  animation: scaleOut 0.3s ease-in;
}

[data-scope='dialog'][data-part='close-trigger'] {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

[data-scope='dialog'][data-part='close-trigger']:focus {
  outline: 2px blue solid;
  outline-offset: 2px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes scaleIn {
  from {
    scale: 0.8;
  }
  to {
    scale: 1;
  }
}

@keyframes scaleOut {
  to {
    scale: 0.8;
  }
}
</style>
