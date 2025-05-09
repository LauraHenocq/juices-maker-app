<script setup lang="ts">
import { Recipe } from '@/domain/Recipe';
import { computed }  from 'vue';
import Season from '@/components/common/Season.vue';
import IngredientList from '@/components/common/IngredientList.vue';
import HandleFavoriteButton from '@/components/common/HandleFavoriteButton.vue';
import { useFavoritesStore } from '@/stores/favorites.store';

const { handleItemInFavorites, favoritesList } = useFavoritesStore();
  
const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true
  }
});

const handleRecipeInFavorites = () => {
  handleItemInFavorites(recipe);
};

const isInFavorite = computed(() => {
  return recipe.isInFavorites(favoritesList);
})

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
      <HandleFavoriteButton @handleFavorite="handleRecipeInFavorites" :isInFavorite="isInFavorite"/>
    </div>
    <IngredientList :ingredients="recipe.ingredients"/>
    <p class="no-margin">
      {{ recipe.description }}
    </p>
    <p v-if="recipe.goodToKnow" class="recipe-information__good-to-know">
      <span class="underline">Bon à savoir :</span> {{ recipe.goodToKnow }}
    </p>
  </div>
</template>
<style lang="scss" scoped>
.recipe-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &__good-to-know {
    border: 1px solid $quaternary;
    border-radius: $radius;
    padding: 10px;
  }
}
</style>