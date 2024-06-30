<script setup lang="ts">
import { storeToRefs } from 'pinia'
import OrderFinishedSuccess from '@/components/checkout/OrderFInishedSuccess.vue'
import OrderFinishedEmpty from '@/components/checkout/OrderFinishedEmpty.vue'

const { order } = storeToRefs(useCheckoutStore())
const show = computed(() => !order.value ? OrderFinishedEmpty : OrderFinishedSuccess)
</script>

<template>
  <v-container>
    <v-row class="my-10" justify="center">
      <v-col cols="12" md="8">
        <component :is="show" />
      </v-col>
    </v-row>
  </v-container>
</template>
