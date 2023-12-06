<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "App",
  components: {
    Navbar: defineAsyncComponent(() =>
      import(
        /* wepackChunkName: "Navbar" */ "@/modules/shared/components/Navbar.vue"
      )
    )
  }
};
</script>

<style>
#app {
  background-color: #d3e2f2;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
a.router-link-exact-active {
  color: red;
}
</style>
