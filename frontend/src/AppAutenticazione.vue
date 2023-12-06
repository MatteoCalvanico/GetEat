<template>
    <main>
    <section class="vh-100">
    <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="https://futureacademy.it/assets/images/fac-simile.png?o=false"
            class="img-fluid" alt="GetEat">
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form action="#" method="POST">
                <RouterView/>
            </form>
        </div>
        </div>
    </div>
    </section>
    </main>
</template>

<style lang="scss">
@import "./scss/styles.scss";
</style>
