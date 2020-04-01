<template>
<div>
    <Navigation/>
    <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Profile</v-card-title>
                        <v-row>
                        <v-col class="ma-4">
                            <p>{{userData}}</p>
                        </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                <v-card>
                    <v-card-title>Edit Users</v-card-title>
                    <v-subheader>Hardware Help Desk Team</v-subheader>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="i in userData" v-bind:key="i.engId">
                            <v-expansion-panel-header><strong>{{i.fname}} {{i.lname}}</strong></v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Username" v-model="i.username"></v-text-field>
                                        <v-text-field label="First Name" v-model="i.fname"></v-text-field>
                                        <v-text-field label="Last Name" v-model="i.lname"></v-text-field>
                                        <v-text-field :type="'password'" label="Password" v-model="i.password"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-btn class="ma-2" color="blue">Save</v-btn>
                                    <v-btn class="ma-2" color="red">Delete</v-btn>
                                    
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-subheader>Software Help Desk Team</v-subheader>
                    <v-subheader>Help Desk Manager</v-subheader>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
</div>
</template>
<script>
import axios from 'axios'
import Navigation from '../components/Navigation'
export default {
    components: {
        Navigation
    },
  data: () => ({
      userData: {
      }
  }),
  methods: {
  },
  mounted() {
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:5000/api/users/all').then(response => {
              this.userData = response.data;
          })
  }
}
</script>