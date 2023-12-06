<!-- Pagina iniziale l'utente o l'amministratore farà il login per poi usare la web app -->

<template>
    <section class="vh-100">
    <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="https://futureacademy.it/assets/images/fac-simile.png?o=false"
            class="img-fluid" alt="GetEat">
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form action="#" method="POST">
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" id="userEmail" placeholder="Indirizzo email" class="form-control form-control-lg" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" id="userPsw" placeholder="Password" class="form-control form-control-lg" />
                </div>

                <!-- Login button -->
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <button type="submit">Login</button>
                </div>
            </form>

            <!--Divider-->
            <div class="mt-3">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">OPPURE</p>
            </div>

            <!--Register button-->
            <div class="d-flex flex-column align-items-center justify-content-center mt-2">
                <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
                    <router-link to="/">Non hai un'account? Registrati!</router-link>
                </a>
            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<style lang="scss">
@import "../scss/styles.scss";
</style>