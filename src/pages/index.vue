<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { productList } = storeToRefs(useProductStore())
</script>

<template>
  <Suspense>
    <ProductCard :products="productList" />
  </Suspense>
</template>
