interface Data {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export async function useValidatePostalCode(code: number | string) {
  const isValid = ref<boolean>(false)

  const { error, data } = await useFetch<Data>(`https://viacep.com.br/ws/${code}/json/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (data.value)
    isValid.value = true

  return { isValid, data, error }
}
