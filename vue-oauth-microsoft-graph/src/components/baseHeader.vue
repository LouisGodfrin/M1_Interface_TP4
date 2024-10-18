<template>
    <nav>
        <!-- Use of $route.path to have the good link in the nav to go to the good page  -->
        <router-link v-if="$route.path !== '/'" to="/">Go back to Home</router-link>

        <router-link v-if="user && $route.path === '/'" to="/conversations">Conversations</router-link>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

    export default 
    {
        name : 'baseHeader',

        computed: 
        {
            ...mapState(['user']), // Get the user state from Vuex
        },
    };
</script>
7
<style>

</style>