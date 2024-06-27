<script setup lang="ts">
const step = defineModel('step', { default: 1 })
const steps = [
  { id: 1, title: 'Informações do Usuário' },
  { id: 2, title: 'Endereço de Entrega' },
  { id: 3, title: 'Pagamento' },
  { id: 4, title: 'Revisão' },
]
</script>

<template>
  <v-stepper v-model="step" color="indigo">
    <template #default="{ prev, next }">
      <v-stepper-header>
        <template v-for="n in steps" :key="n.id">
          <v-stepper-item
            :step="n.title"
            :value="n.id"
            :complete="step > n.id"
            :color="step > n.id ? 'success' : 'indigo'"
            :title="n.title"
          />
        </template>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item
          v-for="n in steps"
          :key="n.id"
          :value="n.id"
        >
          <slot :name="n.id" />
        </v-stepper-window-item>
      </v-stepper-window>

      <v-stepper-actions
        next-text="Próximo"
        prev-text="Voltar"
        @click:next="next"
        @click:prev="prev"
      />
    </template>
  </v-stepper>
</template>
