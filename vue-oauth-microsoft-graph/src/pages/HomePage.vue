<template>
    <div>
      <SigninButton/>
    </div>
      <div v-if="user">
        <p>Welcome, {{user.username }}</p>
      </div>
    <div>
      <AsyncComponent @click="denied" />
    </div>
  
    <div>
      <ButtonLayout :isDisabled="isDisabled" @click="handleClick">
        {{ isDisabled ? 'Disabled' : 'Click Me' }}
      </ButtonLayout>
  
      <ButtonLayout :style="{ width: buttonWidth + 'px', height: buttonHeight + 'px' }"
      :class="{ bigger: isBigger, max: isMax }" @click="BiggerWeight" :isDisabled ="isMax"> 
        Bigger
      </ButtonLayout>
    </div>
  
    <div>
      <ButtonLayout :buttonWidth="200" :buttonHeight="40" color="primary">
          Great
      </ButtonLayout>
    
      <ButtonLayout :buttonWidth="200" :buttonHeight="40" color="warn">
          Warning
      </ButtonLayout>
    
      <ButtonLayout :buttonWidth="200" :buttonHeight="40" color="danger">
          Danger
      </ButtonLayout>
    </div>

</template>
  
  <script>
  import { mapState } from 'vuex';
  import SigninButton from '../components/SigninButton.vue';
  import AsyncComponent from '../components/AsyncComponent.vue';
  import ButtonLayout from '../components/ButtonLayout.vue';
  
  export default 
  {
    name: 'HomePage',

    components: 
    {
      AsyncComponent,
      ButtonLayout,
      SigninButton,
    },

    data() 
    {
      return {
        isDisabled: false,
        isCut: false, 
        isBigger: false,
        isMax: false,
        buttonWidth: 200,
        buttonHeight: 40,
        click: 1,
      };
    },

    computed: 
    {
      ...mapState(['user']) // Map the `user` state from Vuex
    },

    methods: 
    {
        handleClick() 
        {
            this.isDisabled = true;
        },

        BiggerWeight() 
        {
            if (!this.isMax) 
            {
                this.buttonWidth += 20;
                this.buttonHeight += 20;
                if (this.buttonWidth >= 300 && this.buttonHeight >= 300) 
                {
                this.isMax = true;
                }
            }
        },

        denied() 
        {
            if (this.isPending) 
            {
              return Promise.resolve(); // Don't exect again is already is
            }
            this.isPending = true;
            return new Promise((resolve) => 
            {
            setTimeout(() => 
            {
                console.log("+1s");
                this.click++;
                console.log(this.click);
                this.isPending = false;
                resolve();
            }, this.click * 1000);
            });
        },
    },
  };
  </script>
  
  <style scoped>
  .asynchrone {
    margin-bottom: 20px;
  }
  </style>