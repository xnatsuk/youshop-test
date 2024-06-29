import type { Product } from '@/types'

const API_URL = import.meta.env.VITE_API_URL

export async function useGetAll() {
  const { error, data } = await useFetch<Product[]>(`${API_URL}/offers`, {
    method: 'GET',
  })

  if (error.value !== null)
    console.error(error.value)

  return { data }
}

export async function useGetByOffer(code: string | number) {
  const { error, data } = await useFetch<Product>(`${API_URL}/offers/${code}`, {
    method: 'GET',
  })

  if (error.value !== null)
    console.error(error.value)

  return { data }
}
