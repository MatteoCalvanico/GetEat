//Uso un bus degli eventi di Vue per condividere il carrello fra più componenti

import { ref } from 'vue'; //utile per ottenere un riferimento diretto a uno specifico elemento
export const eventBus = ref(new EventTarget());