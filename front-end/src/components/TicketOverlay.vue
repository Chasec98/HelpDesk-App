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
                <v-select :items="['Open','Closed']" label="Status"></v-select>
            </v-col>
            </v-row>
            <v-row>
            <v-col v-show="activeTicket.createdAt">
                <h3>Created: </h3><p></p>
                </v-col>
                <v-col v-show="activeTicket.closedAt">
                <h3>Closed: </h3><p></p>
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
            <v-row>
            <v-col align='right'>
                <v-btn class="ma-18" color="primary" @click="showTicket = false">Exit</v-btn>
                <v-btn class="ma-1" color="primary">Save</v-btn>
            </v-col>
            </v-row>
        </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'TicketOverlay',
    data: ()=>({
    }),
    props: {
        showTicket: {
            type: Boolean,
            default: false
        },
        activeTicket: {
            type: Object,
            default: ()=>({
                ticketNumber: 1234
            })
        }
    }
}
</script>