<template>
<div>
  <Navigation/>
    <v-container>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>
                    Personal Preferences
                  </v-card-title>
                  <v-row>
                    <v-col class="ml-2">
                      <v-switch label="Dark Mode" v-model="$vuetify.theme.dark"></v-switch>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
        </v-container>
</div>
</template>
<script>
import Navigation from '../components/Navigation'
export default {
  components:{
    Navigation
  }
}
</script>