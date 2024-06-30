import { defineStore } from 'pinia'
import type { CheckoutInfo, Order, PaymentInfo, ShippingInfo, UserInfo } from '@/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const userInfo = ref<UserInfo>()
  const paymentInfo = ref<PaymentInfo>()
  const shippingInfo = ref<ShippingInfo>()
  const order = ref<Order | null>(null)
  const total = ref<number>(0)

  function setCheckoutInfo(user: UserInfo, payment: PaymentInfo, shipping: ShippingInfo, value: number) {
    userInfo.value = user
    paymentInfo.value = payment
    shippingInfo.value = shipping
    total.value = value
  }

  async function setOrder(request: CheckoutInfo, code: string | number) {
    const response = await useCheckout(request, code)
    order.value = response?.data
  }

  function getCheckoutInfo(): CheckoutInfo {
    return {
      user: userInfo.value!,
      payment: paymentInfo.value!,
      shipping: shippingInfo.value!,
      total: total.value,
    }
  }

  function getOrder() {
    return order.value
  }

  return {
    userInfo,
    paymentInfo,
    shippingInfo,
    order,
    setOrder,
    setCheckoutInfo,
    getCheckoutInfo,
    getOrder,
  }
})
