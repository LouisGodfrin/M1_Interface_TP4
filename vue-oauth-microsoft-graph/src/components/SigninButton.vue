<template>
    <div>
      <button @click="signIn" :disabled="isCut">
      {{ isCut ? 'Disabled' : 'Sign In' }}
    </button>
    </div>
  </template>
  
  <script>
  import { initializeMsal, signInAndGetUser } from '@/lib/microsoftGraph';
  import { mapState, mapMutations } from 'vuex';
  
  export default 
  {
    name: 'SigninButton',

    data() 
    {
      return {
        msalInitialized: false, // Initialisation State
      };
    },
    computed: 
    {
      // use of spread operator ("...") to allows my code to add properties or methods to an object in order to make them accessible.
      ...mapState(['isCut']), // Map the `isCut` state
      isDisabled() 
      {
        return this.isCut; // Disable the button if the user have signed 
      }
    },
    async created() 
    {
      try 
      {
        await initializeMsal();
        this.msalInitialized = true;
      } 
      catch (error) 
      {
        console.error("Erreur lors de l'initialisation de MSAL :", error);
      }
    },
    methods: 
    {
      ...mapMutations(['setUser', 'setIsCut']),

      async signIn() 
      {
        if (!this.msalInitialized) 
        {
          console.error("MSAL n'est pas encore initialisé !");
          return;
        }

        // Prevent multiple interactions siginTrigger 
        if (this.isCut) 
        {
          console.warn("Interaction already in progress, please wait.");
          return;
        }

        try 
        {
          this.setIsCut(true);

          const user = await signInAndGetUser(); 
          if (user) 
          {
            this.setUser(user); // This should call Vuex `signIn` action
          } 
        } 

        catch (error) 
        {
          // Check for interaction in progress error
          if (error.errorCode === "interaction_in_progress") 
          {
            console.warn("Interaction is already in progress.");
          } 
          else 
          {
            console.error("Error during sign-in:", error);
          }
        }
      }
    }
  }
</script>
  