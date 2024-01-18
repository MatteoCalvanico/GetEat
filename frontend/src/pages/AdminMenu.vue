<!--Qui l'admin potrà modificare il menu-->
<script lang="ts">
import { defineComponent } from 'vue';
import Arrow from '../component/Arrow.vue';
import { Categoria } from '../types';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      categorie: [] as Categoria []
    };
  },components:{
    Arrow
  },
  methods: {
    getCat(){
      axios.get("/api/categorie").then(response => this.categorie = response.data)
    }
  },
  mounted() {
    this.getCat()
  },
});
</script>


<template>
  <h1 class="fw-bold">Aggiungi un prodotto al menù</h1>

  <form class="formProd">
    <!--Select Cat-->
    <div class="form-group form-control-lg ">
      <label class="form-label fw-bold text-muted">Seleziona la categoria</label>
      <select class="form-select fw-bold text-muted">
        <option class="fw-bold text-muted" v-for="cat in categorie">{{ cat.IDcat }}: {{ cat.Nome }}</option>
      </select>
    </div>
    <!--Insert ID-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci l'ID</label>
      <input type="text" class="form-control fw-bold text-muted" placeholder="Es: prod1" required>
    </div>
    <!--Insert Nome-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci il nome</label>
      <input type="text" class="form-control fw-bold text-muted" placeholder="Es: Hot Dog" required>
    </div>
    <!--Insert Prezzo-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci il prezzo</label>
      <input type="text" class="form-control fw-bold text-muted" placeholder="Es: 10.50$ --> 10.50" required>
    </div>
    <!--Insert Sconto-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci la percentuale di sconto</label>
      <input type="text" class="form-control fw-bold text-muted" placeholder="Es: 15% di sconto --> 5.00" value="0.00">
    </div>
    <!--Insert Img-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Scegli l'immagine del prodotto</label>
      <input type="file" class="form-control fw-bold text-muted" accept="image/*" required>
    </div>
    <!--Insert Kcal-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci le Kcal</label>
      <input type="text" class="form-control fw-bold text-muted" placeholder="Es: 1000" required>
    </div>
    <!--Submit button-->
    <div class="col-12">
      <button type="submit">Aggiungi</button>
    </div>
  </form>

  <Arrow/>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>