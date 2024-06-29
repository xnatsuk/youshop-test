import type { CheckoutInfo, Order } from '@/types'

const API_URL = import.meta.env.VITE_API_URL

export async function useCheckout(order: CheckoutInfo, code: string | number) {
  const { error, data } = await useFetch(`${API_URL}/offers/${code}/create_order`, {
    method: 'POST',
    body: JSON.stringify(order),
  })

  if (error.value !== null)
    console.error(error.value)

  if (data.value !== null) {
    const response = JSON.parse(data.value as string) as Order
    return { data: response }
  }
}
