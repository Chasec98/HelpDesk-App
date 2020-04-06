<template>
    <div>
        <Navigation />
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-row>
                            <v-col class="ma-4">
                                <h2>Name: </h2><p>{{user.fname}} {{user.lname}}</p>
                                <h3>Title: </h3><p>{{getRoleName(user.roleId)}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Edit Users</v-card-title>
                        <v-subheader>Team</v-subheader>
                        <v-expansion-panels>
                            <v-expansion-panel v-for="i in userData" v-bind:key="i.engId">
                                <v-expansion-panel-header><strong>{{i.fname}} {{i.lname}}</strong><div style='color:grey'>{{getRoleName(i.roleId)}}</div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row>
                                        <v-col>
                                            <v-text-field label="Username" v-model="i.username"></v-text-field>
                                            <v-text-field label="First Name" v-model="i.fname"></v-text-field>
                                            <v-text-field label="Last Name" v-model="i.lname"></v-text-field>
                                            <v-text-field :type="'password'" label="Password" v-model="i.password">
                                            </v-text-field>
                                            <v-select :items="roleData" item-text="name" item-value="roleId" v-model="i.roleId" label="Role"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-btn class="ma-2" color="blue" @click="updateUser(i)">Save</v-btn>
                                        <v-btn class="ma-2" color="red" @click="deleteUser(i.engId)">Delete</v-btn>
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-btn @click="newUser()" class="ma-2" color="blue">New User</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <UserOverlay v-bind:showUser="showUser" v-bind:roleData="roleData" />
    </div>
</template>
<script>
    import axios from 'axios'
    import Navigation from '../components/Navigation'
    import UserOverlay from '../components/UserOverlay'
    export default {
        components: {
            Navigation,
            UserOverlay
        },
        data: () => ({
            user: {},
            userData: [],
            roleData: [],
            showUser: false
        }),
        mounted() {
            axios.defaults.withCredentials = true;
            this.getData()
        },
        methods: {
            deleteUser: function (userId) {
                axios.post('http://localhost:5000/api/users/delete/' + userId).then(this.getData).catch()
            },
            getData: function () {
                axios.get('http://localhost:5000/api/users').then(response => {
                    this.user = response.data;
                }).catch()
                axios.get('http://localhost:5000/api/users/all').then(response => {
                    this.userData = response.data;
                })
                axios.get('http://localhost:5000/api/roles/all').then(response =>{
                    this.roleData = response.data;
                })
            },
            updateUser: function(user){
                axios.put('http://localhost:5000/api/users/'+user.engId,user).then(this.getData).catch()
            },
            newUser: function () {
                this.activeUser = {},
                    this.showUser = true
            },
            getRoleName: function(rId){
                for(var i = 0; i < this.roleData.length; i++){
                    if(this.roleData[i].roleId == rId){
                        return this.roleData[i].name
                    }
                }
            }
        },
    }
</script>