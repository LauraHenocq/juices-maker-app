<script setup lang="ts">
import { GroceryItem } from '@/domain/Recipe';

defineProps<{
  ingredient: GroceryItem;
}>();

</script>
<template>
  <div class="ingredient-information">
    <p class="no-margin">{{ ingredient.quantity }} {{ ingredient.name }}</p>
  </div>
</template>
<style lang="scss" scoped>
.ingredient-information {
  width: fit-content;
  padding: 10px;
  background-color: $purple;
  color: white;
  border-radius: 50px;
}
</style>