<script setup lang="ts">
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

const { validate, values } = useForm({
  validationSchema: yup.object({
    holder: yup.string().required('Campo obrigatório'),
    cardNumber: yup.number().required('Campo obrigatório'),
    cardMonth: yup.number().required('Campo obrigatório'),
    cardYear: yup.number().required('Campo obrigatório'),
    cardCvv: yup.number().required('Campo obrigatório'),

  }),
})
const { value: holder, errorMessage: holderError } = useField('holder')
const { value: cardNumber, errorMessage: cardNumberError } = useField('cardNumber')
const { value: cardMonth, errorMessage: cardMonthError } = useField('cardMonth')
const { value: cardYear, errorMessage: cardYearError } = useField('cardYear')
const { value: cardCvv, errorMessage: cardCvvError } = useField('cardCvv')

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
  <v-container fluid>
    <v-text-field
      v-model="holder"
      class="my-3"
      label="Nome do Titular"
      hint="Nome impresso no cartão"
      variant="outlined"
      base-color="indigo"
      color="indigo"
      :error-messages="holderError"
      clearable
      required
    />

    <v-row no-gutters>
      <v-text-field
        v-model="cardNumber"
        class="mr-5 my-3"
        label="Número do Cartão"
        variant="outlined"
        base-color="indigo"
        color="indigo"
        :error-messages="cardNumberError"
        clearable
        required
      />
      <v-text-field
        v-model="cardCvv"
        class="my-3"
        label="Cód. de Segurança"
        hint-="Ultimos 3 dígitos no verso do cartão"
        variant="outlined"
        max-width="150"
        base-color="indigo"
        color="indigo"
        :error-messages="cardCvvError"
        required
      />
    </v-row>

    <v-row no-gutters>
      <v-text-field
        v-model="cardMonth"
        class="mr-5 my-3"
        label="Mês"
        variant="outlined"
        max-width="100"
        base-color="indigo"
        color="indigo"
        :error-messages="cardMonthError"
        required
      />
      <v-space />
      <v-text-field
        v-model="cardYear"
        class="my-3"
        label="Ano"
        variant="outlined"
        max-width="100"
        base-color="indigo"
        color="indigo"
        :error-messages="cardYearError"
        required
      />
    </v-row>
  </v-container>
</template>
