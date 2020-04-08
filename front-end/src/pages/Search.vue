<template><div>
    <Navigation />
    <v-text-field hide-details prepend-icon="mdi-magnify" single-line placeholder="Search"></v-text-field>
          </div>
</template>
<script>
import Navigation from '../components/Navigation'
export default {
    components:{
        Navigation
    },
    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>