<script setup lang="ts">
import {
  Avatar,
  type AvatarRootEmits,
  type AvatarRootProps,
  useForwardPropsEmits
} from '@ark-ui/vue'
import { computed } from 'vue'

export interface AvatarProps extends AvatarRootProps {
  src: string
  name: string
}

const props = defineProps<AvatarProps>()
const emits = defineEmits<AvatarRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const getInitials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>

<template>
  <Avatar.Root v-bind="forwarded">
    <Avatar.Fallback>{{ getInitials }}</Avatar.Fallback>
    <Avatar.Image :src="props.src" :alt="props.name" />
  </Avatar.Root>
</template>

<style scoped>
[data-scope='avatar'][data-part='root'] {
  width: 80px;
  height: 80px;
  border-radius: 9999px;
}

[data-scope='avatar'][data-part='image'] {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: inherit;
}

[data-scope='avatar'][data-part='fallback'] {
  width: 80px;
  height: 80px;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  color: white;
  background-color: #777;
}

[data-scope='avatar'][data-part='fallback']:not([hidden]) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
