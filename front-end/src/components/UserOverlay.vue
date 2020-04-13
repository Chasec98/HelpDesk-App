<template>
    <v-dialog max-width="80%" @click:outside="showUser = !showUser" :value="showUser">
        <v-card full-width>
            <v-card-title>New User</v-card-title>
            <v-container>
                <v-form @submit="createUser()">
                <v-row>
                    <v-col>
                        <v-text-field label="Username" v-model="activeUser.username"></v-text-field>
                        <v-text-field label="First Name" v-model="activeUser.fname"></v-text-field>
                        <v-text-field label="Last Name" v-model="activeUser.lname"></v-text-field>
                        <v-text-field :type="'password'" label="Password" v-model="activeUser.password"></v-text-field>
                        <v-select label="Role" :items="roleData" item-text="name" item-value="roleId" v-model="activeUser.roleId"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn class="ma-2" color="blue" type="submit">Save</v-btn>
                </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'UserOverlay',
        data: () => ({
            activeUser: {}
        }),
        props: ['showUser','roleData'],
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