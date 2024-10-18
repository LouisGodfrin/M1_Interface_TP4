<template>
    <div>
      <h1>Conversation Details</h1>
      <p>The ID of this conversation is: {{ conversationId }}</p>
    </div>
  </template>
  
<script>
  export default 
  {
    name: 'ConversationShowPage',
    
    data() 
    {
      return {
        conversationId: null, // Initialement null, sera mis à jour dans mounted()
      };
    },
    
    // Utilisez un hook de cycle de vie pour initialiser conversationId
    created() 
    {
      this.conversationId = this.$route.params.id;
    },
    
    watch: 
    {
      // Si l'ID de la route change, on met à jour conversationId
      '$route.params.id'(newId) 
      {
        this.conversationId = newId;
      },
    },
  };
</script>
  
<style>

</style>
  