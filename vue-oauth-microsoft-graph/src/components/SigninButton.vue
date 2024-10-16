<template>
    <div>
      <button @click="signIn" :disabled="state.isCut">
      {{ state.isCut ? 'Disabled' : 'Sign In' }}
    </button>
    </div>
  </template>
  
  <script>
  import { initializeMsal, signInAndGetUser } from '@/lib/microsoftGraph';
  
  export default 
  {
    name: 'SigninButton',
    inject: ['state', 'setUser'],

    data() 
    {
      return {
        user: null,  // Information of the user
        msalInitialized: false, // Initialisation State
      };
    },
    async created() 
    {
      try {
        await initializeMsal();
        this.msalInitialized = true;
      } catch (error) {
        console.error("Erreur lors de l'initialisation de MSAL :", error);
      }
    },
    methods: 
    {
      async signIn() 
      {
        if (!this.msalInitialized) 
        {
          console.error("MSAL n'est pas encore initialisé !");
          return;
        }
  
        try 
        {
        
          this.user = await signInAndGetUser();
          this.setUser(this.user); // Update by injection
        } 
        catch (error) 
        {
          console.error("Erreur lors de la connexion :", error);
        }
      },
    },
  };
  </script>
  