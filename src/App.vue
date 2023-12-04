<template>
  <div id="app">
    <header>
      <Navbar></Navbar>
    </header>

    <main>
      <Main></Main>
    </main>
    <footer>
      <About> </About>
      <Service></Service>
    </footer>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/Home-page/Navbar.vue";
import Main from "./components/Home-page/Main.vue";
import About from "./components/Home-page/About.vue";
import Service from "./components/Home-page/Service.vue";
import Footer from "./components/Home-page/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Main,
    About,
    Service,
    Footer
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
</style>
