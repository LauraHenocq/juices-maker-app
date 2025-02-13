<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import type { Ref } from 'vue';
import Menu from '@/components/common/menu/Menu.vue';
import type { MenuItem } from '@/types/MenuItem';

const menuToDisplay: Ref<MenuItem[]> = ref([
  {
    label: 'Les recettes de jus',
    link: '/recipes'
  },
  {
    label: 'Mes favoris',
    link: '/favoris'
  },
  {
    label: 'Les fruits et légumes de saisons',
    link: '/season'
  }
]);

</script>

<template>
  <div>
    <Menu :menu="menuToDisplay" />
  </div>

  <RouterView />
</template>
