<template>
  <div>
    <MainPage></MainPage>
    <AboutPage></AboutPage>
    <ServicePage></ServicePage>
    <FooterPage></FooterPage>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "home",
  components: {
    AboutPage: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "AboutPage*/ "@/modules/homepage/components/Aboutpage.vue"
      )
    ),
    MainPage: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "MainPage*/ "@/modules/homepage/components/MainPage.vue"
      )
    ),
    ServicePage: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "ServicePage*/ "@/modules/homepage/components/ServicePage.vue"
      )
    ),
    FooterPage: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "FooterPage*/ "@/modules/homepage/components/FooterPage.vue"
      )
    )
  }
};
</script>
