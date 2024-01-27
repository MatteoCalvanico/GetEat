<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from "axios"
    import { Prodotto } from '../types'
    import { eventBus } from '../event-bus'
    import Arrow from '../component/Arrow.vue'

    export default defineComponent({
        data() {
            return {
                datiProd: [] as Prodotto [],
                esauritoMap: {} as Record<string, boolean>, //Tiene traccia di quali prodotti sono già stati messi nel carrello (usiamo il sessioStorage per tenere in dati anche al cambio di componente)
                isAdmin: sessionStorage.getItem('isAdmin')
            }
        },components:{
            Arrow
        },
        methods: {
            getProdotto(){
                axios.get("/api/prodotto/" + this.$route.params.id).then(response => {
                this.datiProd = response.data;
                this.initializeEsauritoMap();
            });
            },        
            initializeEsauritoMap() {
                const newEsauritoMap: Record<string, boolean> = {};
                this.datiProd.forEach(prodotto => { newEsauritoMap[prodotto.IDprod] = sessionStorage.getItem(`esaurito_${prodotto.IDprod}`) === 'true'; });
                this.esauritoMap = newEsauritoMap;
            },
            addItemToCart(index: number) { //Funzione per aggiungere il prodotto
                const prodotto = this.datiProd[index];
                if (!this.esauritoMap[prodotto.IDprod]) {
                    eventBus.value.dispatchEvent(new CustomEvent('add-to-cart', { detail: prodotto }));
                    
                    this.esauritoMap[prodotto.IDprod] = true;                      //Segna il prodotto come esaurito dopo essere stato aggiunto al carrello
                    sessionStorage.setItem(`esaurito_${prodotto.IDprod}`, 'true'); //Salva nello stato sessionStorage
                }
            },
            delItemAdmin(index: number, imgName: string) {
                const prodotto = this.datiProd[index];
                axios.delete('/api/delProdotto', { data: { id: prodotto.IDprod, imgName: imgName } }).then(() => {
                    this.getProdotto(); // Ri-popoliamo la pagina
                }).catch(error => {
                    console.error('Errore durante la cancellazione del prodotto:', error);
                });
            }
        },
        mounted() {
            this.getProdotto()
        },
    })

</script>


<template>
    <div class="container">
        <h1 class="fw-bold">Scegli il tuo prodotto!</h1>

        <div class="row">
            <a class="btnCart">
                <router-link id="btn" to="/Carrello">Val al carrello</router-link>    
            </a>
        </div>

        <div class="row">
            <div id="card" class="col-sm-4" v-for="(prodotto, index) in datiProd" :key="prodotto.IDprod">
                <div class="card">
                    <img :src="'/img/' + prodotto.Img" alt="">
                    <div class="card-body">
                    <h5 class="card-title">{{prodotto.Nome}}</h5>
                    <p class="card-text">{{prodotto.Prezzo}} $</p>
                    <p class="card-text">Calorie totali: {{prodotto.Kcal}}</p>
                    <button v-if="isAdmin === 'false'" @click="addItemToCart(index)" :disabled="esauritoMap[prodotto.IDprod]" :style="{ backgroundColor: esauritoMap[prodotto.IDprod] ? '#CCCCCC' : '#minor-details' }"> 
                        {{ esauritoMap[prodotto.IDprod] ? 'Esaurito' : 'Aggiungi al carrello' }} 
                    </button>
                    <button class="btnDelProd" v-if="isAdmin === 'true'" @click="delItemAdmin(index, prodotto.Img)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
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