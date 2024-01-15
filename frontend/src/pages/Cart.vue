<script lang="ts">
import { defineComponent} from 'vue';
import axios from 'axios';
import Arrow from '../component/Arrow.vue';
import { Prodotto } from '../types';

export default defineComponent({
    props: {
        cart: Array as () => Prodotto[],
    },
    methods: {
        delItemFromCart(index: number, prodottoID: string) {
            if (this.cart && index >= 0 && index < this.cart.length) {
                this.cart.splice(index, 1);
                
                sessionStorage.removeItem(`esaurito_${prodottoID}`); // Rimuovi il prodotto esaurito dal sessionStorage
            }
        },
        async checkout() {
            if (this.cart && this.cart.length > 0) {
                await axios.post("/api/checkout", {
                    ordinatario: sessionStorage.getItem("id"),
                    cart: this.cart,
                });
                
                // Rimuovi tutti i prodotti esauriti dal sessionStorage
                this.cart.forEach(prodotto => {
                    sessionStorage.removeItem(`esaurito_${prodotto.IDprod}`);
                });

                location.reload();
            }
            else {
                console.log("Cart vuoto");
            }
        }
    },
    components: { Arrow }
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
                        <button @click="delItemFromCart(index, prodotto.IDprod)">Rimuovi</button>
                    </li>
                </ul>
                <button class="btnSendCart" v-if="cart && cart.length > 0" @click="checkout">Invia ordine</button>
            </div>
        </div>
        <Arrow/>
    </div>
</template>
  
<style lang="scss">
    @import "../scss/styles.scss";
</style>