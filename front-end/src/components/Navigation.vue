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
      </v-app-bar>
    </div>
</template>

<script>
export default {
    name:'Navigation',
    data: ()=>({
        headers: [{
        title: 'Home',
        icon: 'mdi-home',
        link: '/'
      },
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        link: '/dashboard'
      },
      {
        title: 'Profile',
        icon: 'mdi-account',
        link: '/profile'
      },
      {
        title: 'Settings',
        icon: 'mdi-settings',
        link: '/settings'
      }
    ],
    drawer: false
    })
}
</script>