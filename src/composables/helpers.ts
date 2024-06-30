import { useValidationAggregator, useValuesAggregator } from '@/composables/formAggregator'
import type { PaymentInfo, ShippingInfo, UserInfo } from '@/types'

interface OrderValues {
  userValues: UserInfo
  shippingValues: ShippingInfo
  paymentValues: PaymentInfo
  total: number
}

type OrderValuesAggregator = OrderValues[]

const { setCheckoutInfo } = useCheckoutStore()

export function useCheckoutHelper() {
  const { validateAll } = useValidationAggregator()
  const { getValues } = useValuesAggregator()
  const error = ref<string | null>(null)

  async function processCheckout(total: number) {
    const results = await validateAll()
    if (results.some(result => !result.valid)) {
      error.value = 'Por favor, preencha todos os campos corretamente'
      return { error }
    }

    const [user, shipping, payment] = getValues() as OrderValuesAggregator
    return setCheckoutInfo(user.userValues, payment.paymentValues, shipping.shippingValues, total)
  }

  return {
    processCheckout,
    error,
  }
}
