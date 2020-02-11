<template>
    <v-container>
        <v-row align="center">
            <v-col align="center">
                <v-card width='50%'>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-text-field label="Username" :value="user"></v-text-field>
                        <v-text-field type="password" :value="pass" label="Password"></v-text-field>
                        <v-btn>Login</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        user: "",
        pass: ""
    }),
    methods: {

    }
}
</script>