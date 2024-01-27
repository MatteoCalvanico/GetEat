<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Ordine } from '../types';
import Arrow from '../component/Arrow.vue';

export default defineComponent({
  data() {
    return {
      datiOrdini: [] as Ordine[][],
      costiOrdini: {} as Record<string, number>
    };
  },components:{
    Arrow
  },
  methods: {
    getOrdini() {
      axios.get('/api/ordini').then((response) => {
        this.datiOrdini = this.groupByOrderID(response.data);
        console.log(this.datiOrdini)
      });

      axios.get('/api/costoOrdini').then((response) => {
        const costiOrdini = response.data.reduce((acc: Record<string, number>, ordine: any) => {
          acc[ordine.IDordine] = ordine.CostoTotale;
          return acc;
        }, {});
        this.costiOrdini = costiOrdini;
      });
    },
    groupByOrderID(ordini: Ordine[]){
      const OrdGroupBy: Record<string, Ordine[]> = {}; //Utilizzando un Record, funziona come una 'map' ma meno complicata da usare, che ci permette di organizzare per bene tutti gli ordini con la stessa chiave
      ordini.forEach((ordine) => {
        const key = ordine.IDordine;
        if (!OrdGroupBy[key]) { //Se la chiave non è ancora presente nella lista la aggiungiamo
          OrdGroupBy[key] = [];
        }
        OrdGroupBy[key].push(ordine); //Assocciamo l'ordine attuale alla chiave giusta
      });
      return Object.values(OrdGroupBy); //Ritorniamo un array di ordini (v-for non funziona altrimento)
    },
    deleteOrder(ordineID: string){
      axios.delete('/api/cancellaOrdine/' + ordineID).then(() => {
        this.getOrdini() //Ri-scarichiamo tutti gli ordini
      })
    }
  },
  mounted() {
    this.getOrdini();
  },
});
</script>

<template>
  <div class="container">
    <h1 class="fw-bold">Pagina Admin</h1>
    <button class="btnNavigation"><RouterLink style="text-decoration: none; color:burlywood;" :to="'/ModMenu'">Modifca il menù</RouterLink></button>
      <div class="row fw-bold text-muted">
        <ul>
          <li v-for="ordGroup in datiOrdini" :key="ordGroup[0].IDordine" class="d-flex flex-column">
            Ordinatario: {{ ordGroup[0].NomeOrdinante }}
            <ul>
              <li class="adminLi" v-for="ordine in ordGroup" :key="ordine.IDordine">
                <img :src="'/img/' + ordine.Img" alt="" class="imgLi">
                {{ ordine.NomeProdotto }}
              </li>
            </ul>
            Prezzo totale: {{ costiOrdini[ordGroup[0].IDordine] }}
            <button class="btnDel" @click="deleteOrder(ordGroup[0].IDordine)">Elimina</button>
          </li>
        </ul>
      </div>
    <Arrow/>
  </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>
