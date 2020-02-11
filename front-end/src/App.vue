<template>
  <v-app>
    <!--Navigation Component(must be in v-app tag)-->
    <Navigation/>
    <v-content>
    <!--Page component loaded using ./router/index.js-->
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>
//import pages
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
};
</script>