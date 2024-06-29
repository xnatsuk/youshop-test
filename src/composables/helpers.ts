import { useCheckoutStore } from '@/stores/checkout.store'
import { useValidationAggregator, useValuesAggregator } from '@/composables/formAggregator'
import type { PaymentInfo, ShippingInfo, UserInfo } from '@/types'

type OrderValues = [UserInfo, ShippingInfo, PaymentInfo]
export function useCheckoutHelper(total: number) {
  const { setUserInfo, setPaymentInfo, setShippingInfo } = useCheckoutStore()
  const { validateAll } = useValidationAggregator()
  const { getValues } = useValuesAggregator()
  const error = ref<string | null>(null)

  async function processCheckout() {
    const results = await validateAll()
    if (results.some(result => !result.valid)) {
      error.value = 'Por favor, preencha todos os campos corretamente'
      return { error }
    }

    const getOrderValues = getValues() as OrderValues
    const { name, phone, email } = getOrderValues[0]
    const { address, city, state, neighborhood, postalCode } = getOrderValues[1]
    const { birthday, cpf, type: payment } = getOrderValues[2]

    setUserInfo({ name, phone, email })
    setShippingInfo({ address, city, state, neighborhood, postalCode })
    setPaymentInfo({ birthday, cpf, type: payment, total })

    return null
  }

  return {
    processCheckout,
    error,
  }
}
