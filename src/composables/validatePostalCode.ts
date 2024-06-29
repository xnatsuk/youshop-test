/* eslint-disable ts/strict-boolean-expressions */
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

  const { error, data } = await useFetch(`https://viacep.com.br/ws/${code}/json/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (error.value || data.value === null) {
    isValid.value = false

    return { isValid }
  }
  else {
    const response = JSON.parse(data.value as string) as Data
    isValid.value = true

    return { isValid, response, error }
  }
}
