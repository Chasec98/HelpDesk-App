<template>
    <v-container>
        <v-row align="center">
            <v-col align="center">
                <v-card width='50%'>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-text-field label="Username" v-model="user"></v-text-field>
                        <v-text-field type="password" v-model="pass" label="Password"></v-text-field>
                        <v-btn @click="login()">Login</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name: 'Login',
    data: () => {
        return {
        user: "",
        pass: ""
    }},
    methods: {
        login: function (){
            axios.post('http://localhost:5000/api/session/login',{
                "username": this.user,
                "password": this.pass
            }).then(this.$router.push({path: '/'}))
        }
    }
}
</script>