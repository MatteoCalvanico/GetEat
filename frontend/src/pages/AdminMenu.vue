<!--Qui l'admin potrà modificare il menu-->
<script lang="ts">
import { defineComponent } from 'vue';
import Arrow from '../component/Arrow.vue';
import { Categoria} from '../types';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      categorie: [] as Categoria [],
      form: {
        categoria: { IDcat: '', Nome: '' } as Categoria,
        id: '',
        nome: '',
        prezzo: '',
        sconto: '0.00',
        immagine: null as File | null,
        kcal: '',
        },
      errore: ''
    };
  },components:{
    Arrow
  },
  methods: {
    getCat(){
      axios.get("/api/categorie").then(response => this.categorie = response.data)
    },
    imgAdd(event: Event){
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.form.immagine = file;
      }
    },
    addProdotto() {
      const formData = new FormData();

      formData.append('categoria', this.form.categoria.IDcat);
      formData.append('id', this.form.id);
      formData.append('nome', this.form.nome);
      formData.append('prezzo', this.form.prezzo);
      formData.append('sconto', this.form.sconto);
      formData.append('kcal', this.form.kcal);

      axios.post("/api/addProdotto", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(_response => {
        this.errore = 'Prodotto aggiunto';
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        if (error.response) {
          // La richiesta è stata fatta e il server ha risposto con uno stato diverso da 2xx
          console.error('Dettagli della risposta:', error.response.data);
          console.error('Codice di stato:', error.response.status);
          console.error('Intestazioni della risposta:', error.response.headers);
        } else if (error.request) {
          // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
          console.error('La richiesta è stata fatta, ma non è stata ricevuta alcuna risposta');
        } else {
          // Qualcos'altro ha generato un errore
          console.error('Errore durante la richiesta:', error.message);
        }
        this.errore = 'Si è verificato un errore durante l\'aggiunta del prodotto.';
      });
    }

  },
  mounted() {
    this.getCat()
  },
});
</script>


<template>
  <h1 class="fw-bold">Aggiungi un prodotto al menù</h1>

  <form class="formProd" enctype="multipart/form-data" @submit.prevent="addProdotto">
    <!--Select Cat-->
    <div class="form-group form-control-lg ">
      <label class="form-label fw-bold text-muted">Seleziona la categoria</label>
      <select class="form-select fw-bold text-muted"  v-model="form.categoria">
        <option class="fw-bold text-muted" v-for="cat in categorie" :value="cat">{{ cat.IDcat }}: {{ cat.Nome }}</option>
      </select>
    </div>
    <!--Insert ID-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci l'ID</label>
      <input type="text" class="form-control fw-bold text-muted" v-model="form.id" placeholder="Es: prod1" required>
    </div>
    <!--Insert Nome-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci il nome</label>
      <input type="text" class="form-control fw-bold text-muted" v-model="form.nome" placeholder="Es: Hot Dog" required>
    </div>
    <!--Insert Prezzo-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci il prezzo</label>
      <input type="text" class="form-control fw-bold text-muted" v-model="form.prezzo" placeholder="Es: 10.50$ --> 10.50" required>
    </div>
    <!--Insert Sconto-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci la percentuale di sconto</label>
      <input type="text" class="form-control fw-bold text-muted" v-model="form.sconto" placeholder="Es: 15% di sconto --> 5.00">
    </div>
    <!--Insert Img-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Scegli l'immagine del prodotto</label>
      <input type="file" class="form-control fw-bold text-muted" accept="image/*" @change="imgAdd" name="immagine" required>
    </div>
    <!--Insert Kcal-->
    <div class="form-group form-control-lg">
      <label class="form-label fw-bold text-muted">Inserisci le Kcal</label>
      <input type="text" class="form-control fw-bold text-muted" v-model="form.kcal" placeholder="Es: 1000" required>
    </div>
    <!--Submit button-->
    <div class="col-12">
      <button type="submit">Aggiungi</button>
      <p v-if="errore" class="text-danger">{{ errore }}</p>
    </div>
  </form>

  <Arrow/>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>