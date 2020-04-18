<template>
    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
            <div class="navbar-header">
                <a class="navbar-brand">
                    Citron System
                </a>
            </div>
            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="menu-element">
                        <router-link to="/">
                            <font-awesome-icon class="menu-icon" icon="tachometer-alt"/>
                            <span>Dashboard</span>
                        </router-link>
                    </li>
                    <h3 class="menu-title">UI elements</h3>
                    <!--<b-dropdown menu-class="dropdown-elements" id="dropdown-1" variant="link" class="menu-element dropdown-btn">
                      <template v-slot:button-content>
                        <font-awesome-icon class="menu-icon" icon="laptop"/>
                        <span>Projects</span>
                      </template>
                      <b-dropdown-item class="menu-element">
                        <font-awesome-icon icon="puzzle-piece" class="menu-icon"/>
                        <span>First Action</span></b-dropdown-item>
                      <b-dropdown-item class="menu-element">
                        <font-awesome-icon icon="puzzle-piece" class="menu-icon"/>
                        <span>Second Action</span></b-dropdown-item>
                      <b-dropdown-item class="menu-element">
                        <font-awesome-icon icon="puzzle-piece" class="menu-icon"/>
                        <span>Third Action</span></b-dropdown-item>
                    </b-dropdown>-->
                    <li class="menu-element">
                        <router-link to="/projects">
                            <font-awesome-icon icon="laptop" class="menu-icon"/>
                            <span>Проекты</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
</template>

<script>
    import {faPuzzlePiece, faLaptop, faTachometerAlt} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "drawer",
        created() {
            this.$fontAwesome.add(faPuzzlePiece, faLaptop, faTachometerAlt);
        },
    }
</script>

<style scoped>

</style>