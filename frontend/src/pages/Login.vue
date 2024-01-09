<!-- Pagina iniziale l'utente o l'amministratore farà il login per poi usare la web app -->

<script lang="ts">

import axios from "axios"

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async submitForm() {
        try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password
        });

        const data = response.data;

        if (data.logged === true) {
          sessionStorage.setItem("id", data.id)
          sessionStorage.setItem("logged", "true")
            if (data.admin) {
              window.location.href = 'Admin';
            } else {
              window.location.href = 'home';
            }
        } else {
          if (data == "Utente non trovato") {
            this.error = data
          } else if (data == "Password errata") {
            this.error = data
          } else {
            this.error = data
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }}}
</script>

<template>

    <!-- previene il comportamento di default del form e chiama il metodo submitForm -->
    <form @submit.prevent="submitForm">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <input type="text" id="username" placeholder="Inserire username" class="form-control form-control-lg"
            v-model="username" />
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <input type="password" id="password" placeholder="Inserire password" class="form-control form-control-lg"
            v-model="password" />
        </div>

        <!-- Login button -->
        <div class="d-flex flex-column align-items-center justify-content-center">
            <button type="submit">Login</button>
        </div>

        <!-- Error message -->
        <p v-if="error" class="text-danger">{{ error }}</p>

        <!--Divider-->
        <div class="mt-3">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OPPURE</p>
        </div>

        <!--Register button-->
        <div class="d-flex flex-column align-items-center justify-content-center mt-2">
            <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
                <router-link to="/Regitration">Non hai un'account? Registrati!</router-link>
            </a>
        </div>
    </form>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>