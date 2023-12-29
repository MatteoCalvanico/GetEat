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
        <div class="row">
            <div class="text-center">
                <ul>
                    <li v-for="(prodotto, index) in cart" :key="index">
                        <img :src="'/img/' + prodotto.Img" alt="">
                        {{ prodotto.Nome }} - {{ prodotto.Prezzo }}$
                        <button>Rimuovi</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss">
    @import "../scss/styles.scss";
</style>