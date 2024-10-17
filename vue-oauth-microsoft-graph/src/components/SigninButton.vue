<template>
    <div>
      <button  class = "button" @click="signIn" :disabled="isCut">
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
<style scoped>
  .button 
  {
    height: 40px;
    width: 170px;
    padding: 10px 20px;
    font-size: 16px;
    font-family: Arial, sans-serif;
    border: 2px solid #7b4b5d;
    border-radius: 4px;
    background-color: #fff;
    color: #7b4b5d;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .button:not(:disabled):hover 
  {
    background-color: #7b4b5d;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .button:focus {
    outline: none;
    border-color: #a77283;
    box-shadow: 0 0 0 3px rgba(123, 75, 93, 0.3);
  }

  .button:disabled 
  {
    background-color: #e0e0e0;
    color: #b0b0b0;
    border-color: #b0b0b0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
</style>
  