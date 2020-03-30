<template>
<div>
    <Navigation/>
    <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Profile</v-card-title>
                        <v-row>
                            <v-col class="ml-3">
                                <h3>Username: </h3><p>{{ userData.user }}</p>
                            </v-col>
                        </v-row>
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
      getData: function () {
          axios.get('http://localhost:5000/api/session').then(response => {
              this.userData = response.data;
          })
      }
  },
  mounted() {
      axios.defaults.withCredentials = true;
      this.getData()
  }
}
</script>