<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { order } = storeToRefs(useCheckoutStore())
const showOrder = computed(() => order.value)
</script>

<template>
  <v-card align="center">
    <v-card-title class="text-indigo mt-10">
      <h2>Agradecemos sua Compra!</h2>
    </v-card-title>

    <v-card-text class="text-h6">
      <p class="my-5">
        Seu pedido foi processado com sucesso.
      </p>
      <p class=" my-3">
        Número do pedido: {{ showOrder?.orderCode }}
      </p>
    </v-card-text>

    <v-divider />

    <v-card-item>
      <h2 class="font-weight-regular text-indigo text-h5">
        Dados do Cliente
      </h2>

      <p class="text-regular">
        {{ showOrder?.user.name }}
      </p>
      <p v-show="order?.user.email" class="text-regular">
        {{ showOrder?.user.email }}
      </p>
      <p class="text-regular">
        {{ showOrder?.user.phone }}
      </p>
    </v-card-item>

    <v-divider />

    <v-card-item>
      <h2 class="font-weight-regular text-indigo text-h5">
        Endereço de Entrega
      </h2>

      <p class="text-regular">
        {{ showOrder?.shipping.address }}
      </p>
      <p class="text-regular ">
        {{ showOrder?.shipping.postalCode }}
      </p>
      <p class="text-regular">
        {{ showOrder?.shipping.city }} {{ showOrder?.shipping.state }}
      </p>
    </v-card-item>

    <v-divider />

    <v-container>
      <v-card-item v-show="order?.status">
        <h2 class="font-weight-regular text-indigo">
          Status do Pedido
        </h2>

        <p class="text-regular text-h3">
          {{ showOrder?.status }}
        </p>
      </v-card-item>

      <v-card-item>
        <h2 class="font-weight-regular text-indigo">
          Detalhes do Pagamento
        </h2>

        <v-img class="my-5" :src="order?.invoice ?? showOrder?.pix" />

        <h2 class="font-weight-regular">
          Total: R$ {{ showOrder?.total }}
        </h2>
      </v-card-item>
    </v-container>

    <v-card-actions>
      <router-link class="mx-auto" to="/">
        <v-btn color="indigo" variant="tonal">
          Continuar Comprando
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>
