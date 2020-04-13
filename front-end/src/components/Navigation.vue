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
          >{{user.fname.charAt(0).toUpperCase()+user.lname.charAt(0).toUpperCase()}}
          </v-avatar>
        </template>
        <v-btn @click="togglePaging()" dark small fab color="blue"><v-icon>{{user.paging ? "mdi-lightbulb" : "mdi-lightbulb-outline"}}</v-icon></v-btn>
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
        user: {},
        drawer: false
    }),
    methods: {
      logout: () => {
        axios.post('http://localhost:5000/api/session/logout').then(()=>{
          this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
        }).catch(err=>{
          console.log(err)
        })
      },
      getUser: function(){
        axios.get('http://localhost:5000/api/users').then(response=>{
          this.user = response.data
        }).catch(err=>{
          console.log(err)
        })
      },
      togglePaging: function(){
        this.user.paging = !this.user.paging
        axios.put('http://localhost:5000/api/users/'+this.user.engId,this.user).then().catch(err=>{
          console.log(err)
        })
      },
      getRoles: function(){
        axios.get('http://helpdesk.ccarter98.com/api/roles').then(response=>{
        this.headers = response.data.pages;
      }).catch(err=>{
          console.log(err)
        })
      }
    },
    mounted() {
      this.getRoles()
      this.getUser()
    },
}
</script>