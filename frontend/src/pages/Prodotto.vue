<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Prodotto } from '../types'

    export default defineComponent({
        data() {
            return {
                datiProd: [] as Prodotto [],
                cart: [] as Prodotto[]
            }
        },
        methods: {
            getProdotto(){
                axios.get("/api/prodotto/" + this.$route.params.id).then(response => this.datiProd = response.data)
            },
            addItemToCart(index: number) {
                const prodotto = this.datiProd[index];
                this.cart.push(prodotto);
                console.log(this.cart);
            }
        },
        mounted() {
            this.getProdotto()
        },
    })

</script>


<template>
    <div class="container">
        <h1>Scegli il tuo prodotto!</h1>

        <div class="row">
            <a>
                <router-link id="btn" to="/Carrello">Val al carrello</router-link>    
            </a>
        </div>

        <div class="row">
            <div class="col-sm-4" v-for="(prodotto, index) in datiProd" :key="prodotto.IDprod">
                <div class="card">
                <img :src="'/img/' + prodotto.Img" alt="">
                    <div class="card-body">
                    <h5 class="card-title">{{prodotto.Nome}}</h5>
                    <p class="card-text">{{prodotto.Prezzo}} $</p>
                    <p class="card-text">Calorie totali: {{prodotto.Kcal}}</p>
                    <button @click="addItemToCart(index)">Aggiungi al carrello</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>