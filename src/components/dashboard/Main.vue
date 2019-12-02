<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="main">
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
              <a href="#">
                <font-awesome-icon class="menu-icon" icon="tachometer-alt"/>
                <span>Dashboard</span>
              </a>
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
    <div class="right-panel">
      <header class="header">
        <div class="header-menu row">
          <div class="col-sm-7">123</div>
          <div class="col-sm-5">
            <b-dropdown right class="user-area float-right">
              <template v-slot:button-content>
                Алексей
              </template>
              <b-dropdown-item>My Profile</b-dropdown-item>
              <b-dropdown-item>My projects <b-badge pill variant="secondary">13</b-badge></b-dropdown-item>
              <b-dropdown-item>Settings</b-dropdown-item>
              <b-dropdown-item to="/logout">Logout</b-dropdown-item>
            </b-dropdown>
            <div class="language-select dropdown" id="language-select">
              <a class="dropdown-toggle" href="#" data-toggle="dropdown" id="language" aria-haspopup="true"
                 aria-expanded="false">
                <i class="flag-icon flag-icon-us"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="language" x-placement="bottom-start"
                   style="position: absolute; transform: translate3d(0px, 22px, 0px); top: 0px; left: 0px; will-change: transform;">
                <div class="dropdown-item">
                  <span class="flag-icon flag-icon-fr"></span>
                </div>
                <div class="dropdown-item">
                  <i class="flag-icon flag-icon-es"></i>
                </div>
                <div class="dropdown-item">
                  <i class="flag-icon flag-icon-us"></i>
                </div>
                <div class="dropdown-item">
                  <i class="flag-icon flag-icon-it"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="breadcrumbs"></div>
      <div class="content mt-3">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>

  import {faPuzzlePiece, faLaptop, faTachometerAlt} from '@fortawesome/free-solid-svg-icons'

  export default {
    name: "Main",
    props: {
      breadcrumbs: {},
      header: String,
    },
    components: {},
    created() {
      this.$fontAwesome.add(faPuzzlePiece, faLaptop, faTachometerAlt);
    }
  }
</script>

<style scoped>
</style>