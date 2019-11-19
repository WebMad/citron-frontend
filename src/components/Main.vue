<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">
      <div class="navbar-header">
        <a class="navbar-brand">
          Citron System
        </a>
      </div>
      <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="#">
              <i class="menu-icon fas fa-tachometer-alt"></i>
              Dashboard
            </a>
          </li>
          <h3 class="menu-title">UI elements</h3>
          <b-dropdown id="dropdown-1" variant="link" class="m md-2">
            <template v-slot:button-content>
              <i class="menu-icon fa fa-laptop"></i>
              Components
            </template>
            <b-dropdown-item><i class="fa fa-puzzle-piece"></i>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="menu-icon fa fa-laptop"></i>
              Components
            </a>
            <ul class="sub-menu children dropdown-menu">
              <li><i class="fa fa-puzzle-piece"></i><a href="ui-buttons.html">Buttons</a></li>
              <li><i class="fa fa-id-badge"></i><a href="ui-badges.html">Badges</a></li>
              <li><i class="fa fa-bars"></i><a href="ui-tabs.html">Tabs</a></li>
              <li><i class="fa fa-share-square-o"></i><a href="ui-social-buttons.html">Social Buttons</a></li>
              <li><i class="fa fa-id-card-o"></i><a href="ui-cards.html">Cards</a></li>
              <li><i class="fa fa-exclamation-triangle"></i><a href="ui-alerts.html">Alerts</a></li>
              <li><i class="fa fa-spinner"></i><a href="ui-progressbar.html">Progress Bars</a></li>
              <li><i class="fa fa-fire"></i><a href="ui-modals.html">Modals</a></li>
              <li><i class="fa fa-book"></i><a href="ui-switches.html">Switches</a></li>
              <li><i class="fa fa-th"></i><a href="ui-grids.html">Grids</a></li>
              <li><i class="fa fa-file-word-o"></i><a href="ui-typgraphy.html">Typography</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </aside>

</template>

<script>
  export default {
    name: "Main",
    components: {}
  }
</script>

<style scoped>

</style>