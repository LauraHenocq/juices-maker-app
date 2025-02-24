<script setup lang="ts">
import { Recipe } from '@/domain/Recipe';
import { computed }  from 'vue';
import Season from '@/components/common/Season.vue';
import IngredientList from '@/components/common/IngredientList.vue';
import AddToFavoritesButton from '@/components/common/AddToFavoritesButton.vue';
  
const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true
  }
});

const addToFavorites = () => {
  console.log('ajouter la recette aux favoris');
};

const preparationTime = computed(() => {
  const hours = recipe.preparation.hours > 0 ? `${recipe.preparation.hours}h` : '';
  const minutes = recipe.preparation.minutes > 0 ? `${recipe.preparation.minutes}min` : '';
  return `Temps de préparation : ${hours}${minutes}`;
});

</script>
<template>
  <div class="recipe-information">
    <p class="no-margin">{{ recipe.quantityOfJuice }}</p>
    <p class="no-margin">{{ preparationTime }}</p>
    <div class="flex">
      <Season :label="recipe.season" />
      <AddToFavoritesButton @addToFavorites="addToFavorites"/>
    </div>
    <IngredientList :ingredients="recipe.ingredients"/>
    <p class="no-margin">
      {{ recipe.description }}
    </p>
    <p class="recipe-information__good-to-know">
      <span class="underline">Bon à savoir :</span> {{ recipe.goodToKnow }}
    </p>
  </div>
</template>
<style lang="scss" scoped>
.recipe-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &__good-to-know {
    border: 1px solid $quaternary;
    border-radius: $radius;
    padding: 10px;
  }
}
</style>