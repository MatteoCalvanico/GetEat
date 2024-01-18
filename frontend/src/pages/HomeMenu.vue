<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Categoria } from '../types'
    import Arrow from "../component/Arrow.vue"

    export default defineComponent({
        data() {
            return {
                datiCat: [] as Categoria []
            }
        },
        components: {
            Arrow
        },
        methods: {
            getCategorie(){
                axios.get("/api/categorie").then(response => this.datiCat = response.data)
            },
            logout(){
                sessionStorage.clear()
            },
            navigateBack() {
                this.$router.back();
            },
            navigateForward() {
                this.$router.go(1);
            },
        },
        mounted() {
            this.getCategorie()
        },
    })

</script>


<template>
    <div class="container">
        <h1 class="fw-bold">Ordina quello che vuoi quando vuoi!</h1>
        <div class="row">
            <div id="card" class="col-sm-4" v-for="categoria in datiCat">
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
        <Arrow/>
    </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>