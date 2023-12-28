<script lang="ts">
  import { defineComponent } from 'vue';
  import { Prodotto } from '../types';
  
  export default defineComponent({
    props: {
      cart: Array as () => Prodotto[],
    },
  });
</script>

<template>
    <div class="container">
      <h1>Controlla il tuo carrello!</h1>
      <ul>
        <li v-for="(prodotto, index) in cart" :key="index">
          {{ prodotto.Nome }} - {{ prodotto.Prezzo }}$
        </li>
      </ul>
    </div>
</template>
  
<style lang="scss">
    @import "../scss/styles.scss";
</style>