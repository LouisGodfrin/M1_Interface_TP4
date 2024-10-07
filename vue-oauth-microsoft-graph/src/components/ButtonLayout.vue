<template>
  <button class="button" :style="computedStyle" @click="$emit('click')" :disabled="isDisabled" @mouseover="isHovered = true" @focus="isFocused">
    <slot></slot>
  </button>
</template>

<script>
export default 
{
  name: 'ButtonLayout',
  props: 
  {
    
    isDisabled: 
    {
      type: Boolean,
      default: false
    }, 

    color: 
    {
      type: String,
      default: 'primary'
    }
  },
  data() 
  {
    return {
      isHovered: false,
      isFocused: false,
    };
  },
  computed: 
  {
    computedStyle() 
    {
      const baseStyle = this.buttonStyle(this.color);
      return {
        ...baseStyle
      };
    },
  },
  methods: 
  {
    
    buttonStyle(color) 
    {
      const colorPalette = 
      {
        primary: { bg: '#42b983', hoverBg: '#4cce93', focusBorder: '#47d696' },
        warn: { bg: '#ff5722', hoverBg: '#ff7043', focusBorder: '#ff8a65' },
        danger: { bg: '#e53935', hoverBg: '#ef5350', focusBorder: '#e57394' },
      };
      const selectedColor = colorPalette[color] || colorPalette.primary;
      const bgColor = this.isHovered ? selectedColor.hoverBg : selectedColor.bg;
      const borderColor = this.isFocused ? selectedColor.focusBorder : 'transparent';

      return {
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        color: '#fff',
        // cursor: 'pointer',
        // padding: '10px 20px',
        // transition: 'all 0.3s ease',
      };
    },
  },
};
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

