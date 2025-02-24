<script setup lang="ts">
import { GroceryItem } from '@/domain/Recipe';
import Ingredient from '@/components/common/Ingredient.vue';

defineProps<{
  ingredients: Array<GroceryItem>
}>();

</script>
<template>
  <div>
    <p>Les ingrédients dont tu as besoin pour ce jus :</p>
    <div class="ingredient-list">
      <Ingredient v-for="ingredient in ingredients" :ingredient="ingredient"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ingredient-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>