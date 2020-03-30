<template>
  <v-app>
    <v-content>
    <!--Page component loaded using ./router/index.js-->
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>
//import pages

export default {
  name: 'App'
};
</script>