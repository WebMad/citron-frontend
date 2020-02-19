<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="main">
    <aside id="left-panel" class="left-panel">
      <nav class="navbar navbar-expand-sm navbar-default">
        <div class="navbar-header">
          <span class="navbar-brand">
            <span>Citron System</span>
            <b-nav-toggle target="main-menu"><font-awesome-icon icon="bars"/></b-nav-toggle>
          </span>
        </div>
        <b-collapse id="main-menu" class="main-menu show navbar-collapse">
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
            <b-dropdown menu-class="dropdown-elements" variant="link" class="menu-element dropdown-btn">
              <template v-slot:button-content>
                <font-awesome-icon icon="laptop"/>
                <span>Projects</span>
              </template>
              <b-dropdown-item @click.stop to="/projects" class="menu-element"><span>All projects</span></b-dropdown-item>
              <b-dropdown-item to="/projects/create" class="menu-element"><span>New project</span></b-dropdown-item>
            </b-dropdown>
          </ul>
        </b-collapse>
      </nav>
    </aside>
    <div class="right-panel">
      <header class="header">
        <div class="header-menu row">
          <div class="col">
            <b-dropdown left>
              <template v-slot:button-content>
                <font-awesome-icon icon="bell" />
              </template>
            </b-dropdown>
            <b-dropdown class="ml-3" left>
              <template v-slot:button-content>
                <font-awesome-icon icon="envelope" />
              </template>
            </b-dropdown>
          </div>
          <div class="col">
            <b-dropdown variant="primary" right class="user-area float-right">
              <template v-slot:button-content>
                {{ getUser().name }}
              </template>
              <b-dropdown-item>My Profile</b-dropdown-item>
              <b-dropdown-item to="/projects">My projects <b-badge pill variant="secondary">13</b-badge></b-dropdown-item>
              <b-dropdown-item>Settings</b-dropdown-item>
              <b-dropdown-item to="/logout">Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </header>
      <div class="breadcrumbs mt-2">
        <div class="col-sm-4">
          <h1>{{ header }}</h1>
        </div>
      </div>
      <div class="content mt-3">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>

  import {faPuzzlePiece, faLaptop, faTachometerAlt, faBell, faEnvelope, faBars} from '@fortawesome/free-solid-svg-icons'
  import {mapGetters} from 'vuex';

  export default {
    name: "Main",
    props: {
      breadcrumbs: Array,
      header: String,
    },
    data() {
      return {
        breadcrumb: ''
      }
    },
    methods: {
      ...mapGetters('auth', [
            'getUser'
      ])
    },
    components: {},
    created() {
      this.$fontAwesome.add(faPuzzlePiece, faLaptop, faTachometerAlt, faBell, faEnvelope, faBars);
    }
  }
</script>

<style scoped>
</style>