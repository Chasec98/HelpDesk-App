<template>
    <div>
        <Navigation/>
        <v-container>
            <div id="fabButtons">
                <v-btn class="mb-2 mr-2" color="blue" @click="newTicket()" fab><v-icon class="white--text">mdi-plus</v-icon></v-btn>
            </div>
            <v-row>
                <v-col>
                <v-card hover color="#FC3F44">
                    <v-card-title>
                    Tickets Over 7 Days
                    </v-card-title>
                    <v-data-table :loading="loading" dense :headers="headersAssigned" :items="tickets.sevenDays" item-key="name"
                    no-data-text="No tickets over 7 days :)" class="elevation-1" @click:row="openTicket">
                    <template v-slot:item.assignedEng="{ assignedEng }">
                        {{getUsersName(assignedEng)}}
                    </template>
                    </v-data-table>
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                <v-card hover>
                    <v-card-title>My Open Tickets</v-card-title>
                    <v-data-table :loading="loading" dense :headers="headers" :items="tickets.open" class="elevation-1"
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
                    <v-data-table :loading="loading" dense :headers="headers" :items="tickets.project" item-key="name" class="elevation-1"
                    no-data-text="No open projects" @click:row="openTicket"></v-data-table>
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
import Navigation from '../components/Navigation'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        TicketOverlay,
        Navigation
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
    headersAssigned: [{
        text: 'Ticket Number',
        align: 'left',
        value: 'ticketNumber'
      },
      {
          text: 'Assignee',
          value: 'assignedEng'
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
    users: [],
    showTicket: false,
    activeTicket: {},
    loading: true
    }),
    methods: {
        getData: function () {
        axios
            .get('http://localhost:5000/api/tickets')
            .then(response => {
            this.tickets = response.data
            this.loading = false
            }).catch(err=>{
          this.$router.push({name:'login'})
        });
        axios.get('http://localhost:5000/api/users/all').then(response => {
            this.users = response.data;
        });
        },
        openTicket: function (num) {
            axios
                .get('http://localhost:5000/api/tickets/'+num.ticketNumber)
                .then(response => {
                    this.activeTicket = response.data
                    this.showTicket = true
                }).catch(err=>{
          console.log(err)
        })
        },
        newTicket: function (){
            this.activeTicket = {},
            this.showTicket = true;
        },
        getUsersName: function(id){
            for(var i = 0; i < this.users.length; i++){
                if(this.users[i].id == id){
                    return this.users[i].fname+' '+this.users[i].lname
                }
            }
        }
    },
    mounted: function (){
        axios.defaults.withCredentials = true
        this.getData()
    }

}
</script>
<style type='text/css'>
    #fabButtons{
        position: fixed;
        bottom: 0px;
        right: 0px;
        z-index: 999;
    }
</style>