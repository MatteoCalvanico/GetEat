# GetEat 

## Created by:
> - Matteo Calvanico
> - Filippo Monti

## Idea:
> Creare un applicativo web che simuli l’ordinazione di cibi e 
> bevande per clienti di un ristorante e la possibilità per il 
> gestore di controllare gli ordini.

## Installazione:
> 1. Clonare la repository in locale, possibilmente nella cartella htdocs di XAMPP;
> 2. Usare i due SQL per creare e caricare i dati;
> 3. Aprire due terminali, uno per il backend e uno per il frontend;
> 4. In entrambi fare: *npm i* (scarichiamo le dipendenze) e poi *npm run dev*;

## Come funziona:
> Appena si aprirà il sito sarà possibile fare il login o registrarsi, finchè non si avrà un account non si potrà entrare nel sito. 
>
> Con un account admin si potrà accedere alla pagine del gestore dove sarà possibile vedere tutti gli ordini effettuati.
> Con un account user sarà possibile visualizzare il menù e ordinare (non è possibile prendere più volte lo stesso prodotto), andando nel carrello sarà possibile fare il checkout.

## Figma flowchart
> [Here](https://www.figma.com/file/i8ZRa156lHmqLOhIk2BJvT/Sistemi-web-flowchart?type=design&node-id=0-1&mode=design&t=pqyIdV3V6tqmwVWS-0)

## Progettazione:
#### Matteo Calvanico
> Per quanto riguarda il backend mi sono occupato dei vari controller/router per prendere le categorie e i prodotti dove ho usato la classica implementazione che abbiamo anche in laboratorio. Per quanto riguarda la parte di checkout ho utilizzato la libreria uuid per creare un ID univoco per ogni ordine e, dato che l'unico modo per permettere allo stesso utente di fare un ordine con più prodotti diversi era reificare, ho deciso di usare un ciclo che crea un'unica stringa con tante INSERT quanti sono i prodotti da inserire nella tabella Menu.
>
>
> Il carrello è gestito tramite bus degli eventi, ho deciso ti intraprendere questa strada dopo aver riscontrato degli errori con la libreria Vuex.
> Per creare l'event bus utilizzo 'EventTarget' in modo da comunicare fra i componenti.
>
> Dentro Prodotto.vue c'è il metodo vero e proprio per l'aggiunta del carrello, che invia un evento personalizzato attraverso l'event bus con tutti i dati del prodotto.
>
> Nell'App.vue c'è la parte centrale, è presente un listener che aspetta l'evento personalizzato e all'arrivo atraverso un metodo salva effettivamente il prodotto nel carrello. In questo componente ho deciso di usare le Composition API, con la nuova funzione setup() e onMounted utile per registrare l'eventListener appena il componente viene montato.
>
> Infine nel componente Cart.vue viene ricevuto il carrello come prop e utilizzerà i metodi specifici per togliere un elemento da esso o per effettuare il checkout (tramite API POST dove il funzionamento è stato spiegato all'inizio).

#### FIlippo Monti
> Nella fase dell'autenticazione si è creato una pagina di login e di registrazione, consente agli utenti di registrarsi e accedere alla home del sito utilizzando le proprie credenziali. Per garantire la sicurezza delle password, si è usato l'algoritmo di hashing bcrypt. Come sistema di verifica dell'autenticazione abbiamo preferito l'utilizzo del sessionStorage, per evitare una complessità non necessaria, non richiesta nel nostro progetto.
>
> Più nel dettaglio la funzione login() gestisce l'autenticazione degli utenti, riceve due parametri username e password provenienti dal corpo della richiesta HTTP. Se l'utente esiste nel database e la password fornita corrisponde a quella salvata nel database, l'utente viene autenticato e l'applicazione invia un oggetto JSON contenente le informazioni dell'utente, tra cui l'ID, l'indicazione se è un amministratore e l'indicazione che l'utente è effettivamente loggato. In caso contrario, l'applicazione invia un messaggio di errore appropriato.
>
>La funzione registration() gestisce la registrazione degli utenti. Anche in questo caso, la funzione riceve due parametri, username e password, provenienti dal corpo della richiesta HTTP. La funzione converte la password in un hash utilizzando l'algoritmo bcrypt. Successivamente, la funzione inserisce l'utente nel database, incluso il suo ID, il nome utente, il tipo di permesso e la password hash. Se la registrazione ha esito positivo, l'applicazione invia un messaggio di successo. Altrimenti, l'applicazione invia un messaggio di errore appropriato.
>
>Inoltre, si è utilizzato una funzione auth() per comparare la password hash con quella inserita dall'utente nel login.

#### Insieme
> Per il frontend abbiamo usato bootstrap, html e scss per creare le varie pagine, renderle gradevoli alla vista e accessibili, con poi l'aggiunta del router per poterle navigare.
>
> Abbiamo collaborato per gestire il login e la protezione delle pagine in caso l'utente non sia loggato, per realizzarlo abbiamo utilizzato il sessionStorage dove salviamo se l'utente ha effettuato l'accesso o meno, e infine con il tasto logout puliamo il sessionStorage e ritorniamo alla pagina di login.