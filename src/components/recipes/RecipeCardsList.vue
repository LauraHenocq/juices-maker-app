<script setup lang="ts">
import { Recipe } from '@/domain/Recipe';
import RecipeCard from '@/components/recipes/RecipeCard.vue';
  
const { recipeList, border } = defineProps({
  recipeList: {
    type: Array<Recipe> || [],
    required: true
  },
  border: {
    type: Boolean
  }
});
  
</script>
<template>
  <div class="recipe-cards-list">
    <RecipeCard
      v-for="recipe in recipeList" 
      :key="recipe.id" 
      :border="border" 
      :recipe="recipe" 
    />
  </div>
</template>
<style lang="scss" scoped>
.recipe-cards-list {
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 80px;
  row-gap: 32px;
  
  @media screen and (max-width: 1264px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 28px;
    row-gap: 24px;
  }
}
</style>
  