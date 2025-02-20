<script setup lang="ts">
import { juicesService } from '@/services';
import { ref, onMounted } from 'vue';
import { Recipe } from "@/domain/Recipe";
import { GetRecipeListParams } from '@/services/JuicesService';
import type { Ref } from 'vue';
import RecipeCardsList from '@/components/recipes/RecipeCardsList.vue';
import CommonTitle from '@/components/common/Title.vue';

const limit: Ref<number> = ref(6);
const isPending: Ref<Boolean> = ref(false);
const isError: Ref<Boolean> = ref(false);
const recipeList: Ref<Recipe[] | []> = ref([]);

import { useRoute } from 'vue-router';
const route = useRoute(); 

async function getRecipeList(): Promise<void> {
  isError.value = false;

  const params: GetRecipeListParams = {
    limit: limit.value,
    ingredients: route.query.grocery ? [route.query.grocery.toString()] : null,
  };

  isPending.value = true;
  try {
    recipeList.value = await juicesService.getRecipeList(params);
  } catch (err) {
    isError.value = true;
    throw err;
  } finally {
    isPending.value = false;
  }
};

onMounted(async () => {
  await getRecipeList();
});
</script>
<template>
  <div class="container recipe-list">
    <CommonTitle>
      Retrouve des recettes originales selon tes fruits et légumes préférés
    </CommonTitle>
    <div v-if="isPending">
      <p>Chargement en cours...</p>
    </div>
    <div v-else-if="isError">
      <p>Une erreur est survenue lors du chargement des données</p>
    </div>
    <div v-else>
      <RecipeCardsList v-if="recipeList.length" :recipe-list="recipeList" border />
      <p class="recipe-list__no-result" v-else>Aucune recette trouvée</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.recipe-list {
  &__no-result { 
    margin-top: 80px;
  }
}
</style>