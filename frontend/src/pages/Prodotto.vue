<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Prodotto } from '../types'
    import { eventBus } from '../event-bus'

    export default defineComponent({
        data() {
            return {
                datiProd: [] as Prodotto []
            }
        },
        methods: {
            getProdotto(){
                axios.get("/api/prodotto/" + this.$route.params.id).then(response => this.datiProd = response.data)
            },
            addItemToCart(index: number) { //Funzione per aggiungere il prodotto
                const prodotto = this.datiProd[index];
                eventBus.value.dispatchEvent(new CustomEvent('add-to-cart', { detail: prodotto })); //Utilizziamo l'event bus per inviare il carrello poi nel componente App.vue lo riceviamo, tipo """observer""" di java
                console.log("Prodotto aggiunto al carrello:", prodotto);
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
            <a class="btnCart">
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