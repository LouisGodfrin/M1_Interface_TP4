<template>
    <div>
      <button @click="signIn">Sign In</button>
      <div v-if="user">
        <p>Welcome, {{ user.username }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { initializeMsal, signInAndGetUser } from '@/lib/microsoftGraph';
  
  export default 
  {
    name: 'SigninButton',
    data() 
    {
      return {
        user: null,  // Stocker les informations de l'utilisateur ici
        msalInitialized: false, // Suivi de l'état d'initialisation
      };
    },
    async created() 
    {
      // Initialiser MSAL lors de la création du composant
      try {
        await initializeMsal();  // Assurez-vous que la fonction est bien attendue
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
          // Appeler la fonction signInAndGetUser après l'initialisation de MSAL
          this.user = await signInAndGetUser();
        } 
        catch (error) 
        {
          console.error("Erreur lors de la connexion :", error);
        }
      },
    },
  };
  </script>
  