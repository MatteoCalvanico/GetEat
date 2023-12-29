<script lang="ts">
  import { defineComponent } from 'vue';
  import { Prodotto } from '../types';
  
  export default defineComponent({
    props: {
      cart: Array as () => Prodotto[],
    },
    methods: {
        delItemFromCart(index: number) {
            if (this.cart && index >= 0 && index < this.cart.length) {
                this.cart.splice(index, 1);
            }
        }
    }
  });
</script>

<template>
    <div class="container">
      <h1>Controlla il tuo carrello!</h1>
        <div class="row">
            <div class="text-center">
                <p class="txtEmptyCart" v-if="cart?.length === 0">Carrello vuoto</p>
                <ul>
                    <li v-for="(prodotto, index) in cart" :key="index">
                        <img :src="'/img/' + prodotto.Img" alt="">
                        {{ prodotto.Nome }} - {{ prodotto.Prezzo }}$
                        <button @click="delItemFromCart(index)">Rimuovi</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss">
    @import "../scss/styles.scss";
</style>