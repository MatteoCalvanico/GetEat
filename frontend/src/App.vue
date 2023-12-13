<template>
    <main>
        <section class="vh-100 d-flex align-items-center justify-content-center">
            <div class="container py-5 h-100">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="col-md-6 col-lg-6 col-xl-6 offset-xl-1 text-center">
                        <div class="form-outline mb-4">
                            <img src="./assets/logo.png"
                            class="img-fluid" alt="GetEat">
                        </div>
                        <RouterView/>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
@import "./scss/styles.scss";
</style>
