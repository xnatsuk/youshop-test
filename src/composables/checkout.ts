import type { CheckoutInfo, Order } from '@/types'

const API_URL = import.meta.env.VITE_API_URL

export async function useCheckout(order: CheckoutInfo, code: string | number) {
  const { data, error } = await useFetch<Order>(`${API_URL}/offers/${code}/create_order`).post({ order })

  if (error.value !== null)
    console.error(error.value)

  if (data.value !== null) {
    const response = JSON.parse(JSON.stringify(data.value)) as Order
    return { data: response }
  }
}
