<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Ordine } from '../types';
import Arrow from '../component/Arrow.vue';

export default defineComponent({
  data() {
    return {
      datiOrdini: [] as Ordine[][],
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
    <div class="row">
      <div class="text-center">
        <ul class="txtOrdini">
          <li v-for="ordGroup in datiOrdini" :key="ordGroup[0].IDordine">
            Ordinatario: {{ ordGroup[0].NomeOrdinante }}
            <ul>
              <li v-for="ordine in ordGroup" :key="ordine.IDordine">
                {{ ordine.NomeProdotto }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Arrow/>
  </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>
