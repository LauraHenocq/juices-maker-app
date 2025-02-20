<script setup lang="ts">
import { Recipe } from '@/domain/Recipe';
import { ref, computed }  from 'vue';
  
const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true
  }
});

const preparationTime = computed(() => {
  const hours = recipe.preparation.hours > 0 ? `${recipe.preparation.hours}h` : '';
  const minutes = recipe.preparation.minutes > 0 ? `${recipe.preparation.minutes}min` : '';
  return `Temps de préparation : ${hours}${minutes}`;
});

</script>
<template>
  <div class="recipe-information">
    <p>{{ recipe.quantityOfJuice }}</p>
    <p>{{ preparationTime }}</p>
  </div>
</template>