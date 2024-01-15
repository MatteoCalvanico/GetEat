<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  data() {
    return {}
  },
  methods: {
    logout() {
      sessionStorage.clear()
    },
    navigateBack() {
      if (this.$router) {
        this.$router.back();
      }
    },
    navigateForward() {
      if (this.$router) {
        this.$router.go(1);
      }
    },
  },
})
</script>

<template>
  <div>
    <button class="btnNavigation" @click="navigateBack">&lt;&lt;</button>
    <button class="btnLogout" @click="logout"><RouterLink style="text-decoration: none; color:burlywood;" :to="'/'">Logout</RouterLink></button>
    <button class="btnNavigation" @click="navigateForward">>></button>
  </div>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>
