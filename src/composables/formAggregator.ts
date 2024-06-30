import type { GenericObject } from 'vee-validate'

type ValidatorMethodType = () => Promise<{ valid: boolean }>
type ValuesType = GenericObject

export const AddValidatorKey: InjectionKey<
  (validator: ValidatorMethodType) => void
> = Symbol('AddValidatorKey')

export function useValidationAggregator() {
  const validators = ref<ValidatorMethodType[]>([])

  // used by components to add validators to the array
  const register = (validator: ValidatorMethodType) => {
    validators.value.push(validator)
  }

  // provide this aggregator to components
  provide(AddValidatorKey, register)

  // run all validators
  const validateAll = async () => {
    return Promise.all(validators.value.map(v => v()))
  }

  return {
    validateAll,
    register,
  }
}

export const AddValuesKey: InjectionKey<
  (value: ValuesType) => void
> = Symbol('AddValuesKey')

export function useValuesAggregator() {
  const values = ref<ValuesType[]>([])

  const register = (value: ValuesType) => {
    values.value.push(value)
  }

  provide(AddValuesKey, register)

  const getValues = () => {
    return values.value.map((v) => {
      const { ...items } = { ...v }
      return items
    })
  }

  return {
    getValues,
    register,
  }
}
