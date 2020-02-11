<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                <v-card>
                    <v-card-title>Ticket Flow</v-card-title>
                    <v-sparkline>
                    </v-sparkline>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                <v-card hover color="#FC3F44">
                    <v-card-title>
                    Tickets Over 7 Days
                    </v-card-title>
                    <v-data-table dense :headers="headers" :items="tickets.sevenDays" item-key="name"
                    no-data-text="No tickets over 7 days :)" class="elevation-1" @click:row="openTicket"></v-data-table>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                <v-card hover>
                    <v-card-title>My Open Tickets</v-card-title>
                    <v-data-table dense :headers="headers" :items="tickets.open" class="elevation-1"
                    no-data-text="No open tickets" @click:row="openTicket">
                    </v-data-table>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                <v-card hover>
                    <v-card-title>
                    My Open Projects
                    </v-card-title>
                    <v-data-table dense :headers="headers" :items="projects" item-key="name" class="elevation-1"
                    no-data-text="No open projects" @click:row="openTicket"></v-data-table>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed Today</v-card-title>
                    <v-card-text>
                    <h1>{{stats.closed1day}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed This Week</v-card-title>
                    <v-card-text>
                    <h1>{{stats.closed7days}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed This Month</v-card-title>
                    <v-card-text>
                    <h1>{{stats.closed30days}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
        <TicketOverlay v-bind:showTicket="showTicket" v-bind:activeTicket="activeTicket"></TicketOverlay>
    </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import TicketOverlay from '../components/TicketOverlay.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        TicketOverlay
    },
    data: ()=>({
        headers: [{
        text: 'Ticket Number',
        align: 'left',
        value: 'ticketNumber'
      },
      {
        text: 'Contact',
        value: 'callerName'
      },
      {
        text: 'Subject',
        value: 'subject'
      },
      {
        text: 'Age',
        value: 'age'
      }
    ],
    tickets: [],
    projects: [],
    stats: [],
    showTicket: false,
    activeTicket: {}
    }),
    methods: {
        getData: function () {
        axios
            .get('http://localhost:5000/api/tickets?project=false')
            .then(response => {
            this.tickets = response.data
            })
        axios
            .get('http://localhost:5000/api/stats/numClosed')
            .then(response => {
            this.stats = response.data
        })
        axios
            .get('http://localhost:5000/api/tickets?project=true')
            .then(response => {
            this.projects = response.data
        })
        },
        openTicket: function (num) {
            axios
                .get('http://localhost:5000/api/tickets/'+num.ticketNumber)
                .then(response => {
                    this.activeTicket = response.data
                    this.showTicket = true
                })
        }
    },
    mounted: function (){
        this.getData()
    }

}
</script>