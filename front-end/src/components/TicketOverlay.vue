<template>
    <v-dialog max-width="80%" @click:outside="showTicket = !showTicket" :value='showTicket'>
        <v-card full-width>
        <v-card-title></v-card-title>
        <v-container>
            <v-row>
            <v-col v-show="activeTicket.ticketNumber">
                <h2>Ticket #{{activeTicket.ticketNumber}}</h2>
            </v-col>
            <v-col>
              <v-checkbox v-model="activeTicket.project" label="Project"></v-checkbox>
            </v-col>
            </v-row>
            <v-row>
            <v-col v-show="activeTicket.createdAt">
                <h3>Created: </h3><p>{{activeTicket.createdAt}}</p>
                </v-col>
                <v-col v-show="activeTicket.closedAt">
                <h3>Closed: </h3><p>{{activeTicket.closedAt}}</p>
                </v-col>
            </v-row>
                          <v-row>
                <v-col>
                  <v-text-field label="Contact" v-model="activeTicket.callerName"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field label="Subject" v-model="activeTicket.subject"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea label="Problem" v-model="activeTicket.problem"></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea label="Solution" v-model="activeTicket.solution"></v-textarea>
                </v-col>
              </v-row>
              <!--
                <v-row v-show="activeTicket.nextSteps[0]">
                  <v-col>
                  <h2>Notes</h2>
                  </v-col>
                </v-row>
              <v-row>
                <v-col>
                    <v-textarea v-for="step in activeTicket.nextSteps" :key="step.timestamp" v-model="step.text" :label="step.timestamp"></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                <v-btn>Add Note</v-btn>
                </v-col>
              </v-row>
              -->
            <v-row>
            <v-col align='right'>
                <v-btn class="ma-1">Close</v-btn>
                <v-btn class="ma-1" color="primary" @click="updateTicket()">Save</v-btn>
            </v-col>
            </v-row>
        </v-container>
        </v-card>
    </v-dialog>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios'

export default {
    name: 'TicketOverlay',
    data: ()=>({
    }),
    props: ['activeTicket','showTicket'],
    methods:{
      updateTicket: function(){
        axios
          .put('http://localhost:5000/api/tickets/'+this.activeTicket.ticketNumber,this.activeTicket)
          .then(this.showTicket = false)
      }
    },
    mounted: function (){
        axios.defaults.withCredentials = true
    }
}
</script>