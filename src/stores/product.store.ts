import { defineStore } from 'pinia'
import type { Product } from '@/types'

export const useProductStore = defineStore('product', () => {
  const product = ref<Product>()
  const productList = ref<Product[]>([])

  async function setProductList() {
    const { data } = await useGetAll()
    if (data.value)
      productList.value = JSON.parse(data.value) as Product[]

    return productList.value
  }

  async function setProduct(code: string | number) {
    const { data } = await useGetByOffer(code)
    if (data.value)
      product.value = JSON.parse(data.value) as Product

    return product.value
  }

  return {
    product,
    productList,
    setProduct,
    setProductList,
  }
})
