<template>
    <nav>
      <!-- Use of $route.path to have the good link in the nav to go to the good page -->
      <router-link v-if="$route.path !== '/'" to="/">Go back to Home</router-link>
  

      <router-link v-if="isSignedIn && $route.path === '/'" to="/conversations">Conversations</router-link>
    </nav>
  
    <!-- If the user is login, we ask for an id -->
    <div v-if="isSignedIn && $route.path === '/'" id="ConversationID">
      <h3>Enter an ID of conversation</h3>
      
      <!-- placeholder for the user give the id -->
      <input v-model="enteredId" type="text" placeholder="Number ID" />
      <button @click="goToConversation">Go to conversation</button>
    </div>
</template>
  
<script>
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    name: 'baseHeader',
  
    data() {
      return {
        enteredId: '', // stock ID
      };
    },
  
    computed: {
      // State vuex
      ...mapState(['user']),
  
      // Getters Vuex
      ...mapGetters(['isUserSignedIn']),
  
      isSignedIn() 
      {
        return this.isUserSignedIn;
      }
    },

    methods:
    {
        goToConversation() 
        {
            if (this.enteredId)
            {
                this.$router.push(`/conversations/${this.enteredId}`);
            } 
            else 
            {
                alert("Please enter an existant ID.");
            }
        }
   }
}
</script>
  
<style scoped>
#ConversationID {
    padding: 16px;
    display: block;
    align-items: flex-start; /* Aligne les éléments à gauche */
    gap: 10px; /* Espacement entre les éléments */
}

input::placeholder {
    color: #888;
    font-style: italic;
    opacity: 1;
}

input {
    padding: 6px 8px; /* Un padding plus petit pour une taille plus compacte */
    font-size: 14px; /* Une taille de police réduite pour correspondre à un petit champ */
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100px; /* Largeur fixe de 100px */
    max-width: 100px; /* Assure que le champ ne dépasse pas cette taille */
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 6px 12px; /* Petits paddings pour garder le bouton compact */
    font-size: 14px; /* Taille de texte plus petite */
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

</style>
  