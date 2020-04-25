<template>
    <div id="app">
        <div class="main" v-if="isAuth">
            <drawer/>
            <div class="right-panel">
                <navbar/>
                <div class="content mt-3">
                    <router-view/>
                </div>
            </div>
        </div>
        <router-view v-else/>
    </div>
</template>

<style lang="sass">
    @import "assets/sass/style"
</style>

<script>
    import {mapGetters} from "vuex";
    import Drawer from "./components/core/drawer";
    import Navbar from "./components/core/navbar";

    export default {
        name: "App",
        components: {Navbar, Drawer},
        computed: {
            ...mapGetters("auth", ['isAuth'])
        }
    }
</script>
