<template>
    <ButtonLayout class="button" :disabled="isPending" @click="handleClick">
        {{ isPending ? 'Loading...' : 'Click and I load' }}
    </ButtonLayout>
  </template>
  
  <script>
  import ButtonLayout from '../components/ButtonLayout.vue';
  export default 
  {
      name: 'AsyncComponent',
      components: 
      { 
        ButtonLayout, 
      },
      
    data() 
    {
      return {
        isPending: false,
      };
    },
  
    methods: 
    {
      handleClick() 
      {
        if (this.isPending) 
        {
          return;
        }
        const originalOnClick = this.$attrs.onClick;
        if (originalOnClick && typeof originalOnClick === 'function') 
        {
            this.isPending = true;
            originalOnClick().finally(() => 
            {
                this.isPending = false; 
            });
        }
      }
    }
  };
  </script>

  <style>

  </style>