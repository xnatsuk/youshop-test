<template>
  <v-empty-state icon="mdi-alert-box">
    <template #media>
      <v-icon color="yellow-darken-3" />
    </template>

    <template #headline>
      <div class="text-h4">
        Você ainda não fez nenhum pedido.
      </div>
    </template>

    <template #title>
      <div class="text-h6">
        Que tal selecionar alguma oferta e fazer um pedido?
      </div>
    </template>

    <template #text>
      <div class="text-medium-emphasis ">
        Volte para a página inicial e escolha um produto.
      </div>
    </template>

    <template #actions>
      <router-link to="/">
        <v-btn color="indigo" class="mx-auto">
          Página Inicial
        </v-btn>
      </router-link>
    </template>
  </v-empty-state>
</template>
