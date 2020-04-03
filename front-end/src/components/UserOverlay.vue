<template>
    <v-dialog max-width="80%" @click:outside="showUser = !showUser" :value="showUser">
        <v-card full-width>
            <v-card-title>New User</v-card-title>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label="Username" v-model="activeUser.username"></v-text-field>
                        <v-text-field label="First Name" v-model="activeUser.fname"></v-text-field>
                        <v-text-field label="Last Name" v-model="activeUser.lname"></v-text-field>
                        <v-text-field :type="'password'" label="Password" v-model="activeUser.password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn class="ma-2" color="blue" @click="createUser()">Save</v-btn>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'UserOverlay',
        data: () => ({

        }),
        props: ['activeUser', 'showUser'],
        methods: {
            createUser: function () {
                axios.post('http://helpdesk.ccarter98.com/api/users/new',this.activeUser).then(()=>{
                    this.showUser = false;
                }).catch()
            }
        },
        mounted: function () {
            axios.defaults.withCredentials = true
        }
    }
</script>