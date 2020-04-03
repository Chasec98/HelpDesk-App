<template>
<div>
    <Navigation/>
    <v-container>
        <v-row>
            <v-col>
            <v-card>
                <v-card-title>My ROI's</v-card-title>
            </v-card>
            </v-col>
        </v-row>
            <v-row>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed Today</v-card-title>
                    <v-card-text>
                    <h1>{{this.stats.closed1day}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed This Week</v-card-title>
                    <v-card-text>
                    <h1>{{this.stats.closed7days}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed This Month</v-card-title>
                    <v-card-text>
                    <h1>{{this.stats.closed30days}}</h1>
                    </v-card-text>
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
    methods:{
        getStats: function (){
            axios.get('http://helpdesk.ccarter98.com/api/stats/numClosed').then(response=>{
                this.stats = response.data;
            })
        }
    },
    data: ()=>({
        stats: {
            closed1day:0,
            closed7days:0,
            closed30days:0
        }
    }),
    mounted: function (){
        this.getStats()
    }
}
</script>