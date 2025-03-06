<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import Menu from '@/components/common/menu/Menu.vue';
import type { MenuItem } from '@/types/MenuItem';
import { useFavoritesStore } from '@/stores/favorites.store';
import { useToasted } from '@/composables/common/useToasted';
const { getFavorites } = useFavoritesStore();
const toasted = useToasted();

onMounted(async () => {
  try {
    const params = { limit: 6 };
    await getFavorites(params);
  } catch(err) {
    console.log(err);
    toasted.warning('Une erreur est survenue lors de la récupération des favoris');
  } 
});

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
