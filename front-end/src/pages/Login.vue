<template>
    <v-container>
        <v-row align="center">
            <v-col align="center">
                <v-card width='50%'>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-form ref="form" lazy-validation v-model='valid' @submit="login()">
                        <v-text-field :rules="userRules" required label="Username" v-model="user"></v-text-field>
                        <v-text-field :rules="passRules" required type="password" v-model="pass" label="Password"></v-text-field>
                        <v-btn type="submit">Login</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-alert :value="loginError" type="warning" transition="expand-transition">Incorrect Username/Password</v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name: 'Login',
    data: () => {
        return {
        valid: true,
        user: "",
        userRules: [
            v => !!v || 'Username is required'
        ],
        pass: "",
        passRules: [
            v => !!v || 'Password is required'
        ],
        loginError: false
    }},
    methods: {
        login: function (){
                axios.post('http://localhost:5000/api/session/login',{
                    "username": this.user,
                    "password": this.pass
                }).then(resp=>{
                    if(resp.status == 200){
                        this.$router.push({name:'home'})
                    }
                }).catch(()=>{
                    this.loginError = true;
                })
            }
    }
}
</script>