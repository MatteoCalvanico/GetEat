<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { eventBus } from './event-bus';
import { Prodotto } from './types';

export default defineComponent({
  setup() {
    const cart = ref<Prodotto[]>([]); //Usando ref teniamo traccia dello stato del carrello

    //Aggiunta al carrello
    const addToCart = (prodotto: Prodotto) => {
      if(!cart.value.find(itemCart => itemCart.IDprod === prodotto.IDprod)){ //Cerchiamo dentro al cart se c'è un elemento uguale a quello appena passato
        cart.value.push(prodotto);
        console.log("Carrello aggiornato:", cart.value);
      }else{
        console.log("Prodotto già presente");
      }
    };

    //Event listener per l'aggiunta al carrello
    onMounted(() => {
      eventBus.value.addEventListener('add-to-cart', (event: Event) => { //Appena verrà aggiunto un elemento aggiorniamo il carrello
        const prodotto = (event as CustomEvent).detail as Prodotto;
        addToCart(prodotto);
      });
    });

    return {
      cart,
      addToCart,
    };
  },
});
</script>

<template>
  <main>
    <section class="vh-100 d-flex align-items-center justify-content-center">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-6 col-lg-6 col-xl-6 offset-xl-1 text-center">
            <div class="form-outline mb-4">
              <img src="./assets/logo.png" class="img-fluid" alt="GetEat">
            </div>
            <RouterView :cart="cart"/> <!--Passiamo il carrello ai componenti che lo userannò-->
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
    @import "./scss/styles.scss";
</style>
