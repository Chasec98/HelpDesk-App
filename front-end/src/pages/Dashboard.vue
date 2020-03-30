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
                    <h1></h1>
                    </v-card-text>
                </v-card>
                </v-col>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed This Week</v-card-title>
                    <v-card-text>
                    <h1></h1>
                    </v-card-text>
                </v-card>
                </v-col>
                <v-col :cols="4">
                <v-card>
                    <v-card-title>Closed This Month</v-card-title>
                    <v-card-text>
                    <h1></h1>
                    </v-card-text>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
</div>
</template>
<script>
import Navigation from '../components/Navigation'
export default {
    components: {
        Navigation
    }
}
</script>