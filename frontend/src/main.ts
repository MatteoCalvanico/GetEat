import { createApp } from 'vue'
import './scss/styles.scss'
import App from './App.vue'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { createRouter, createWebHistory, Router } from 'vue-router'
import NotFound from "./pages/NotFound.vue"
import Login from "./pages/Login.vue"

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Login },
        {path: "/:pathMatch(.*)*", component: NotFound }
    ]
})

createApp(App).use(router).mount('#app')
