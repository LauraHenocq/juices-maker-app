<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
const props = defineProps({
    color: {
      type: String,
      validator: (val:string) => Object.keys(['green', 'pink', 'purple', 'black']).includes(val),
      default: 'green'
    },
    fontSize: {
      type: String,
      default: '16px',
      validator: (val:string) => Object.keys(['16px', '24px', '32px', '48px']).includes(val)
    },
});

const getColorButton: ComputedRef<string> = computed(() => {
    let buttonColor = '#9DDBAC';
    switch (props.color) {
      case ('green') :
        buttonColor = '#9DDBAC';
        break
      case ('pink') :
        buttonColor = '#D7A0EF';
        break
      case ('purple') :
        buttonColor = '#713CBA';
        break
      case ('black') :
        buttonColor = '#262626';
        break
    }
    return buttonColor;
}) 

const buttonColor: Ref<string> = ref(getColorButton);

const emit = defineEmits(['click']);

const click = () => {
    emit('click');
}
</script>
<template>
    <button class="button" @click="click">
        <slot/>
    </button>
</template>
<style scoped lang="scss">
.button {
    color: #fff;
    font-size: 16px;
    padding: 15px 40px;
    background-color: v-bind(buttonColor);
    border: 1px solid v-bind(buttonColor);
    border-radius: $small-radius;
    transition: all 300ms;
  }
  
  .button:hover {
    background-color: #fff;
    cursor: pointer;
    color: v-bind(buttonColor);
  }

</style>