<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { order } = storeToRefs(useCheckoutStore())
</script>

<template>
  <v-container>
    <v-row class="my-10" justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2>Agradecemos sua Compra!</h2>
          </v-card-title>
          <v-card-text>
            <p>Seu pedido foi processado com sucesso.</p>
            <p>Número do pedido: {{ order.OrderCode }}</p>
            <p>Total: ${{ total }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" to="/">
              Continuar Comprando
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
