<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

const { color, isInFavorite } = defineProps({
  color: {
    type: String,
    validator: (val:string) => Object.keys(['green', 'pink', 'purple', 'black']).includes(val),
    default: 'green'
  },
  isInFavorite: {
    type: Boolean,
  }
});

const getColorButton: ComputedRef<string> = computed(() => {
    let buttonColor = '#9DDBAC';
    switch (color) {
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

const emit = defineEmits(['add-to-favorites']);

const click = () => {
    emit('add-to-favorites');
};

</script>
<template>
    <button class="button" @click="click">
        <span v-if="isInFavorite">&#9829;</span>
        <span v-else>&#9825;</span>
    </button>
</template>
<style scoped lang="scss">
.button {
    color: #fff;
    font-size: 20px;
    padding: 10px;
    background-color: v-bind(buttonColor);
    border: 1px solid v-bind(buttonColor);
    border-radius: 50%;
    transition: all 300ms;
  }
  
  .button:hover {
    background-color: #fff;
    cursor: pointer;
    color: v-bind(buttonColor);
  }

</style>