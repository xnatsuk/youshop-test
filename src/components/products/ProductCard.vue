<script setup lang="ts">
import type { ProductCard } from '@/types'

const products = defineModel<ProductCard[]>('products')
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in products"
        :key="item.name"
        cols="6"
      >
        <v-card>
          <v-img
            :src="item.image"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <v-card-title class="text-white text-align-start">
              {{ item.name }}
            </v-card-title>
          </v-img>

          <v-card-actions>
            <span class="text-h6 text-indigo">
              R$ {{ item.price }}
            </span>

            <v-spacer />

            <router-link :to="`/checkout/${item.offerCode}`">
              <v-btn color="indigo" variant="tonal" prepend-icon="mdi-cart-outline">
                Comprar
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
