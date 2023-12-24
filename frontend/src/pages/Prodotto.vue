<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Prodotto } from '../types'

    export default defineComponent({
        data() {
            return {
                datiProd: [] as Prodotto []
            }
        },
        methods: {
            getProdotto(){
                axios.get("/api/prodotto" + this.$route.params.ID).then(response => this.datiProd = response.data[0])
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
            <div class="col-sm-4" v-for="prodotto in datiProd">
                <div class="card">
                <img :src="'/img/' + prodotto.Img" alt="">
                    <div class="card-body">
                    <h5 class="card-title">{{prodotto.Nome}}</h5>
                    <p class="card-text">{{prodotto.Prezzo}} $</p>
                    <p class="card-text">Calorie totali: {{prodotto.Kcal}}</p>
                    <a href="#" class="btn btn-primary">Aggiungi al carrello</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>