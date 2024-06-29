<script setup lang="ts">
import { date, object, string } from 'yup'
import { useField, useForm, useFormValues } from 'vee-validate'

const { validate, values } = useForm({
  validationSchema: object({
    birthday: date().required('Campo obrigatório'),
    payment: string().required('Escolha uma forma de pagamento'),
    cpf: string()
      .matches(/(\d{3}\.\d{3}\.\d{3}-\d{2})/g, 'CPF inválido')
      .length(14, 'CPF inválido')
      .notOneOf(['000.000.000-00'], 'CPF inválido')
      .required('Campo obrigatório'),

  }),
})

const { value: cpf, errorMessage: cpfError } = useField('cpf')
const { value: birthday, errorMessage: birthdayError } = useField('birthday')
const { value: payment, errorMessage: paymentError } = useField('payment')
const creditCardForm = useFormValues()

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
    <v-row no-gutters>
      <v-text-field
        v-model="cpf"
        class="mr-5 my-3"
        label="CPF"
        hint
        variant="outlined"
        base-color="indigo"
        color="indigo"
        prepend-inner-icon="mdi-card-account-details"
        :error-messages="cpfError"
        clearable
        required
      />
      <v-text-field
        v-model="birthday"
        class="my-3"
        type="date"
        label="Data de Nascimento"
        variant="outlined"
        max-width="200"
        base-color="indigo"
        color="indigo"
        :error-messages="birthdayError"
        clearable
        required
      />
    </v-row>

    <v-divider class="mb-4" />

    <v-radio-group v-model="payment" :error-messages="paymentError" inline>
      <template #label>
        <p class="text-h6 font-weight-regular text-indigo-darken-4">
          Forma de Pagamento
        </p>
      </template>

      <v-radio
        name="payment"
        type="radio"
        color="indigo"
        label="Cartão de Crédito"
        value="credit-card"
      />
      <v-radio
        name="payment"
        type="radio"
        color="indigo"
        label="Boleto Bancário"
        value="invoice"
      />
      <v-radio
        name="payment"
        type="radio"
        color="indigo"
        label="Pix"
        value="pix"
      />
    </v-radio-group>

    <v-divider class="m-4" />

    <payment-credit-card
      v-if="payment === 'credit-card'"
      v-model="creditCardForm"
    />
  </v-container>
</template>
