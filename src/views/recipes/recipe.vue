<script setup lang="ts">
import { juicesService } from '@/services';
import { ref, onMounted } from 'vue';
import { Recipe } from "@/domain/Recipe";
import type { Ref } from 'vue';
import CommonTitle from '@/components/common/Title.vue';
import RecipeInformation from '@/components/recipes/RecipeInformation.vue';

import { useRoute } from 'vue-router';
const route = useRoute(); 

const id: Ref<string | string[]> = ref(route.params.id);
const isPending: Ref<Boolean> = ref(false);
const isError: Ref<Boolean> = ref(false);
const recipe: Ref<Recipe | null > = ref(null);

async function getRecipe(): Promise<void> {
  isError.value = false;

  const params = {
    id: id.value,
  };

  isPending.value = true;
  try {
    recipe.value = await juicesService.getRecipe(params);
  } catch (err) {
    isError.value = true;
    throw err;
  } finally {
    isPending.value = false;
  }
};

onMounted(async () => {
  await getRecipe();
});
</script>
<template>
  <div class="recipe-list">
    <CommonTitle v-if="recipe">
      {{ recipe.title }}
    </CommonTitle>
    <div v-if="isPending">
      <p>Chargement en cours...</p>
    </div>
    <div v-else-if="isError">
      <p>Une erreur est survenue lors du chargement des données</p>
    </div>
    <div v-else-if="recipe">
      <RecipeInformation :recipe="recipe" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.recipe-list {
  margin: 0 0 20px 0;
}
</style>