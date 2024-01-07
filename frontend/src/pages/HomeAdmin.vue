<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Ordine } from '../types'

    export default defineComponent({
        data() {
            return {
                datiOrdini: [] as Ordine []
            }
        },
        methods: {
            getOrdini(){
                axios.get("/api/ordini").then(response => this.datiOrdini = response.data)
            }
        },
        mounted(){
            this.getOrdini()
        }
    })
</script>

<template>
    <div class="container">
        <h1>Pagina Admin</h1>
        <div class="row">
            <div class="text-center">
                <ul>
                    <li v-for="ordine in datiOrdini">
                        ID: {{ ordine.IDordine }} - Ordinatario: {{ ordine.NomeOrdinatario }} - Prodotto: {{ ordine.NomeProdotto }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>