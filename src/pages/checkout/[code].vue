<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const router = useRouter()
const step = ref<number>(1)

const { getCheckoutInfo, setOrder } = useCheckoutStore()
const { product } = storeToRefs(useProductStore())
const getProduct = computed(() => product.value)

const total = computed(() => {
  const item = getProduct.value
  const res = item!.price + item!.tax + item!.shipping
  return Number.parseFloat(res.toFixed(2))
})

const { processCheckout, error } = useCheckoutHelper(total.value)
const isSubmitting = ref<boolean>(false)

async function checkout() {
  try {
    isSubmitting.value = true
    await processCheckout()
    if (error) {
      return error.value
    }
    else {
      const { ...order } = getCheckoutInfo()
      await setOrder(order, product.value!.offerCode)
      router.push('/checkout/success')
    }
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <v-form>
    <v-row class="my-10" justify="center">
      <CheckoutStepper :step>
        <template #1>
          <UserInfoForm />
        </template>

        <template #2>
          <ShippingInfoForm />
        </template>

        <template #3>
          <PaymentInfoForm />
        </template>
      </CheckoutStepper>

      <OrderSummary
        :price="getProduct!.price"
        :tax="getProduct!.tax"
        :shipping="getProduct!.shipping"
        :total
      >
        <v-col>
          <v-btn
            class="w-100 mb-5"
            color="indigo"
            variant="flat"
            :loading="isSubmitting"
            @click="checkout"
          >
            Finalizar Pedido
          </v-btn>

          <span v-show="error" class="text-red-darken-3">{{ error }}</span>
          <v-spacer />
        </v-col>
      </OrderSummary>
    </v-row>
  </v-form>
</template>
