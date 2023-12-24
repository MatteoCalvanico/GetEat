<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Categoria } from '../types'

    export default defineComponent({
        data() {
            return {
                datiCat: [] as Categoria []
            }
        },
        methods: {
            getCategorie(){
                axios.get("/api/categorie").then(response => this.datiCat = response.data)
            }
        },
        mounted() {
            this.getCategorie()
        },
    })

</script>


<template>
    <div class="container">
        <h1>Ordina quello che vuoi quando vuoi!</h1>
        <div class="row">
            <div class="col-sm-4" v-for="categoria in datiCat">
                <div class="card">
                <img :src="'/img/' + categoria.Img" alt="">
                    <div class="card-body">
                    <h5 class="card-title">{{categoria.Nome}}</h5>
                    <p class="card-text">{{categoria.Info}}</p>
                    <a><RouterLink :to="'/Prodotto/' + categoria.IDcat">Ordina</RouterLink></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>