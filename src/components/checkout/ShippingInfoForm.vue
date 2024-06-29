<script setup lang="ts">
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

// const emit = defineEmits(['shippingInfoUpdated'])

const initialValues = {
  postalCode: '',
  state: '',
  city: '',
  neighborhood: '',
  address: '',
}

const { validate, setValues, values, setFieldError } = useForm({
  initialValues,
  validationSchema: toTypedSchema(
    object({
      postalCode: string().required('Campo obrigatório'),
      city: string().required('Campo obrigatório'),
      neighborhood: string().required('Campo obrigatório'),
      address: string().required('Campo obrigatório'),
      state: string()
        .matches(/(A[CLPM]|BA|CE|DF|GO|ES|M[ATSG]|P[ABREI]|R[JNSOR]|S[PCE]|TO)/g, 'Estado inválido')
        .required('Campo obrigatório'),
    }),
  ),
})

const { value: postalCode, errorMessage: postalCodeError } = useField('postalCode')
const { value: state, errorMessage: stateError } = useField('state')
const { value: neighborhood, errorMessage: neighborhoodError } = useField('neighborhood')
const { value: city, errorMessage: cityError } = useField('city')
const { value: address, errorMessage: addressError } = useField('address')

async function handlePostalCode() {
  const { isValid, response } = await useValidatePostalCode(postalCode.value as string)

  if (!isValid.value) {
    setFieldError('postalCode', 'CEP inválido')
    setValues({
      state: '',
      city: '',
      neighborhood: '',
      address: '',
    })
  }

  else {
    setValues({
      state: response!.uf,
      city: response!.localidade,
      neighborhood: response!.bairro,
      address: response!.logradouro,
    })
  }
}

const addValidator = inject(AddValidatorKey, () => {
  throw new Error('No aggregator provided')
})
const addValues = inject(AddValuesKey, () => {
  throw new Error('No aggregator provided')
})

addValidator(validate)
addValues(values)
</script>

<template>
  <Suspense>
    <v-container fluid>
      <v-row no-gutters>
        <v-text-field
          v-model="postalCode"
          class="mr-5 my-3"
          label="CEP"
          variant="outlined"
          max-width="200"
          base-color="indigo"
          color="indigo"
          :error-messages="postalCodeError"
          clearable
          @change="handlePostalCode()"
        />
        <v-text-field
          v-model="address"
          class="my-3"
          label="Endereço"
          variant="outlined"
          base-color="indigo"
          color="indigo"
          :error-messages="addressError"
          clearable
        />
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="state"
          class="mr-5 my-3"
          label="Estado"
          variant="outlined"
          max-width="100"
          base-color="indigo"
          color="indigo"
          :error-messages="stateError"
          clearable
        />
        <v-text-field
          v-model="city"
          class="mr-5 my-3"
          label="Cidade"
          variant="outlined"
          max-width="200"
          base-color="indigo"
          color="indigo"
          :error-messages="cityError"
          clearable
        />
        <v-text-field
          v-model="neighborhood"
          class="my-3"
          label="Bairro"
          variant="outlined"
          base-color="indigo"
          color="indigo"
          :error-messages="neighborhoodError"
          clearable
        />
      </v-row>
    </v-container>
  </Suspense>
</template>
