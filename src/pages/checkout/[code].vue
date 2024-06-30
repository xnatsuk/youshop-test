<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const router = useRouter()
const step = ref<number>(1)

const { getCheckoutInfo, setOrder } = useCheckoutStore()
const { product } = storeToRefs(useProductStore())
const getProduct = computed(() => product.value)
const code = computed(() => product.value!.offerCode)

const total = computed(() => {
  const item = getProduct.value
  const res = item!.price + item!.tax + item!.shipping
  return Number.parseFloat(res.toFixed(2))
})

const { processCheckout, error } = useCheckoutHelper()
const errorMessage = ref('')

async function checkout() {
  errorMessage.value = ''
  error.value = ''

  try {
    await processCheckout(total.value)

    if (error.value) {
      errorMessage.value = error.value
      return
    }

    const order = getCheckoutInfo()
    await setOrder(order, code.value)

    router.push('/checkout/success')
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
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
      v-model:submit="checkout"
      :error="errorMessage"
      :price="getProduct!.price"
      :tax="getProduct!.tax"
      :shipping="getProduct!.shipping"
      :total
    />
  </v-row>
</template>
