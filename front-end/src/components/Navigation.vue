<template>
    <div>
    <v-navigation-drawer v-model="drawer" app mini-variant >
      <v-list dense nav>
        <v-list-item :to="item.link" v-for="item in headers" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#002939" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Help Desk</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field hide-details prepend-icon="mdi-magnify" single-line placeholder="Search"></v-text-field>
        <v-spacer></v-spacer>
        <v-speed-dial
        direction="bottom"
        :open-on-hover="true"
      >
        <template v-slot:activator>
          <v-avatar
            color="blue"
            dark
            fab
          >{{initials}}
          </v-avatar>
        </template>
        <v-btn dark small fab color="blue"><v-icon>mdi-lightbulb</v-icon></v-btn>
        <v-btn href="/#/login" @click="logout()" fab dark small color="red">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-speed-dial>
      </v-app-bar>
    </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios';
export default {
    name:'Navigation',
    data: ()=>({
        headers: [],
        initials: "",
        drawer: false
    }),
    methods: {
      logout: () => {
        axios.post('http://localhost:5000/api/session/logout').then().catch(err=>{
          console.log(err)
        })
      },
      getInitials: function(){
        axios.get('http://localhost:5000/api/users').then(response=>{
          this.initials = response.data.fname.charAt(0).toUpperCase()+response.data.lname.charAt(0).toUpperCase()
        }).catch(err=>{
          console.log(err)
        })
      },
      getRoles: function(){
        axios.get('http://localhost:5000/api/roles').then(response=>{
        this.headers = response.data.pages;
      }).catch(err=>{
          console.log(err)
        })
      }
    },
    mounted() {
      this.getRoles()
      this.getInitials()
    },
}
</script>