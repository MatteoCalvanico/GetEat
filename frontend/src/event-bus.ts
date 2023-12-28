//Uso un bus degli eventi di Vue per condividere il carrello fra più componenti
import { ref } from 'vue';

export const eventBus = ref(new EventTarget());