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
        if (this.username === '' || this.password === '') {
            this.error = 'Tutti i campi sono obbligatori';
            return;
        }
        try {  
        const response = await axios.post('/api/registration', {
          username: this.username,
          password: this.password
        });

        const data = response.data;

        if (data === 'Utente registrato') {
            window.location.href = '/';
        } else {
            console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }}}
</script>


<template>

    <form @submit.prevent="submitForm">
        
        <div class="form-outline mb-4">
            <input type="text" id="username" placeholder="Username" class="form-control form-control-lg"
            v-model="username" />
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <input type="password" id="userPsw" placeholder="Password" class="form-control form-control-lg"
            v-model="password" />
        </div>

        <!-- Registration button -->
        <div class="d-flex flex-column align-items-center justify-content-center">
          <p v-if="error" class="text-danger">{{ error }}</p>  
          <button type="submit">Registrati</button>
        </div>
    </form>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>