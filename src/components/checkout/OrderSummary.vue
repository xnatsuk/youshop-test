<script setup lang="ts">
const props = defineProps<{
  price: number
  shipping: number
  tax: number
  total: number
  error: string | null
}>()

const submit = defineModel('submit')
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
      <OrderSummaryInfo label="Subtotal" :value="props.price" />
      <OrderSummaryInfo label="Frete" :value="props.shipping" />
      <OrderSummaryInfo label="Imposto" :value="props.tax" />

      <v-divider />

      <OrderSummaryInfo label="Total" :value="props.total" />

      <v-card-actions>
        <v-col>
          <v-btn
            class="w-100 mb-5"
            color="indigo"
            variant="flat"
            @click="submit"
          >
            Finalizar Pedido
          </v-btn>

          <span v-show="error" class="text-red-darken-3">{{ error }}</span>
          <v-spacer />
        </v-col>
      </v-card-actions>
    </v-card-item>
  </v-card>
</template>
