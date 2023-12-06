import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'

import './scss/styles.scss'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import AppAutenticazione from './AppAutenticazione.vue'
import NotFound from "./pages/NotFound.vue"
import Login from "./pages/Login.vue"
import Registration from "./pages/Registration.vue"

import App from "./App.vue"
import Home from "./pages/HomeMenu.vue"


const routerAutenticazione: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Login },
        {path: "/Regitration", component: Registration},
        {path: "/:pathMatch(.*)*", component: NotFound }
    ]
})

const routerApp: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/home", component: Home },
        {path: "/:pathMatch(.*)*", component: NotFound }
    ]
})

createApp(App).use(routerApp).mount('#app')
createApp(AppAutenticazione).use(routerAutenticazione).mount('#app')
