<!-- eslint-disable regexp/strict -->
<script setup lang="ts">
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

const initialValues = {
  name: '',
  email: '',
  phone: '',
}

const { validate, values } = useForm({
  initialValues,
  validationSchema: toTypedSchema(
    object({
      name: string().required('Campo obrigatório'),
      email: string().email('Email inválido'),
      phone: string()
        .matches(/(?:^\(0?[1-9]{2}\)|^0?[1-9]{2}[.-\s]?)9?[1-9]\d{3}[.-\s]?\d{4}$/, 'Número de telefone inválido')
        .required('Campo obrigatório'),
    }),
  ),
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: phone, errorMessage: phoneError } = useField('phone')

const addValidator = inject(AddValidatorKey, () => {
  throw new Error('No aggregator provided')
})
const addValues = inject(AddValuesKey, () => {
  throw new Error('No aggregator provided')
})

addValidator(validate)
addValues({ userValues: values })
</script>

<template>
  <v-container fluid>
    <v-text-field
      v-model="name"
      class="my-3"
      label="Nome Completo"
      variant="outlined"
      base-color="indigo"
      color="indigo"
      prepend-inner-icon="mdi-account"
      :error-messages="nameError"
      clearable
      required
    />
    <v-text-field
      v-model="email"
      class="my-3"
      label="Email"
      variant="outlined"
      base-color="indigo"
      color="indigo"
      prepend-inner-icon="mdi-email"
      :error-messages="emailError"
      clearable
    />
    <v-text-field
      v-model="phone"
      type="tel"
      label="Telefone"
      placeholder="(DDD)"
      variant="outlined"
      base-color="indigo"
      color="indigo"
      prepend-inner-icon="mdi-phone"
      :error-messages="phoneError"
      clearable
      required
    />
  </v-container>
</template>
