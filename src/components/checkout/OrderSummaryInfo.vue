<script setup lang="ts">
const props = defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <v-list>
    <v-list-item>
      <template #prepend>
        {{ props.label }}
      </template>
      <template #append>
        {{ props.value }}
      </template>
    </v-list-item>
  </v-list>
</template>
