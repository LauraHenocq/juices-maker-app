<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Loader from '@/components/common/Loader.vue';
import type { MenuItem } from '@/types/MenuItem';

const props = defineProps({
  menu: {
    type: Array<MenuItem>,
    required: true
  }
})

const itemsToDisplay: Ref<MenuItem[]> = ref(props.menu)
const isOpenMenu = ref(false)

function openMenu () {
  isOpenMenu.value = true
  itemsToDisplay.value = props.menu
}

function closeMenu () {
  isOpenMenu.value = false
}
</script>
<template>
  <nav class="menu">
    <RouterLink to="/">
      <div class="menu__logo">
        <Loader />
      </div>
    </RouterLink>
    <button v-if="isOpenMenu" class="menu__bouton" @click="closeMenu">
      <img src="./../../../assets/icons/cross.svg" class="menu__icon" alt="Fermer le menu">
    </button>
    <button v-else class="menu__bouton" @click="openMenu">
      <img src="./../../../assets/icons/bars.svg" class="menu__icon" alt="Ouvrir le menu">
    </button>
    <ul v-show="isOpenMenu" class="menu__items">
      <li v-for="item in itemsToDisplay" :key="item.label">
        <RouterLink
            small
            :to="item.link"
            class="menu__link"
            @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped lang="scss">
.menu {
  position: sticky;
  top: 0;
  z-index: 1;
  display: grid;
  grid-template-rows: 100px auto;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 16px;
}
.menu__logo {
  position: relative;
  padding-top: 20px;
  z-index: 1;
  width: 100px;
}
.menu__logo::before {
  position: absolute;
  left: 100px;
  width: 100%;
  height: 60px;
  animation-name: slideinleft;
  animation-duration: 1s;
  z-index: 1;
}
.menu__logo::after {
  position: absolute;
  top: -2px;
  right: -80px;
  width: 100%;
  height: 60px;
  display: inline-block;
  content: 'Juices App.';
  color: $primary;
  animation-name: slideinright;
  animation-duration: 1s;
  z-index: 1;
}
.menu__bouton {
  border: none;
  background-color: transparent;
  justify-self: end;
  width: 100px;
  height: 100%;
  padding: 20px;
}
.menu__bouton:hover {
  cursor: pointer;
}
.menu__icon {
  width: 90%;
  height: 90%;
}
.menu__items {
  grid-column: 2/3;
  height: calc(100vh - 100px);
  list-style-type: none;
  color: $primary;
  padding: 0;
}
.menu__link {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 26px 16px;
  font-size: 20px;
  border-top: 1px solid $quaternary;
  color: $purple;
  font-style: italic;
}
.menu__link:hover {
  color: $quaternary;
}
a:-webkit-any-link {
  text-decoration: none;
}
// Mobile
@media screen and (max-width: 768px) {
  .menu__items {
    grid-column: 1/3;
  }

  .menu__link {
    padding: 26px 0;
  }
}
// Animations
@keyframes slideinleft {
  from {
    left: -200px;
  }
}
@keyframes slideinright {
  from {
    right: -200px;
  }
}
</style>
