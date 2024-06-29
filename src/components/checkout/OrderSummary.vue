<script setup lang="ts">
const props = defineProps<{
  price: number
  shipping: number
  tax: number
  total: number
}>()
</script>

<template>
  <v-card
    color="indigo"
    variant="tonal"
    title="Resumo do Pedido"
    prepend-icon="mdi-cart"
    class="mx-2 w-25"
  >
    <v-card-item>
      <v-list>
        <v-list-item>
          <template #prepend>
            Subtotal
          </template>
          <template #append>
            {{ props.price }}
          </template>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            Frete
          </template>
          <template #append>
            {{ props.shipping }}
          </template>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            Impostos
          </template>
          <template #append>
            {{ props.tax }}
          </template>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <template #prepend>
            Total
          </template>
          <template #append>
            {{ props.total }}
          </template>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <slot />
      </v-card-actions>
    </v-card-item>
  </v-card>
</template>
