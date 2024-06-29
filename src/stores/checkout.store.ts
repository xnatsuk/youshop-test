/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */
/* eslint-disable ts/no-unsafe-call */
import { defineStore } from 'pinia'
import type { CheckoutInfo, Order, PaymentInfo, ShippingInfo, UserInfo } from '@/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const userInfo = ref<UserInfo>()
  const paymentInfo = ref<PaymentInfo>()
  const shippingInfo = ref<ShippingInfo>()
  const order = ref<Order>()

  function setUserInfo(data: UserInfo) {
    userInfo.value = data
  }

  function setPaymentInfo(data: PaymentInfo) {
    paymentInfo.value = data
  }

  function setShippingInfo(data: ShippingInfo) {
    shippingInfo.value = data
  }

  function getCheckoutInfo(): CheckoutInfo {
    return {
      client: userInfo.value,
      payment: paymentInfo.value,
      shipping: shippingInfo.value,
      total: paymentInfo.value?.total,
    }
  }

  async function setOrder(request: CheckoutInfo, code: string | number) {
    const response = await useCheckout(request, code)

    order.value = response?.data
  }

  return {
    userInfo,
    paymentInfo,
    shippingInfo,
    order,
    setUserInfo,
    setPaymentInfo,
    setShippingInfo,
    setOrder,
    getCheckoutInfo,
  }
})
