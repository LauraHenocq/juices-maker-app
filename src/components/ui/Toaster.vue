<template>
  <transition name="fade">
    <div class="toaster" v-if="isOpen">
      <div class="toast">
        <span>{{ label }}</span>
        <button class="close-btn" @click="close">&times;</button>
      </div>
    </div>
  </transition>
</template>
  
<script setup>
import { ref } from 'vue';
  
defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#dc3545',
  },
  timeout: {
    type: Number,
    default: undefined,
  },
});
  
const isOpen = ref(true);
  
const close = () => {
  isOpen.value = false;
};
</script>
  
<style scoped>
.toaster {
  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  z-index: 1000;
}
  
.toast {
  margin: 5px 0;
  padding: 25px;
  border-radius: 5px;
  color: #fff;
  position: relative;
  background-color: v-bind(color);
}
  
.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
  
.close-btn:hover {
  opacity: 0.7;
}

/* Styles pour la transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>