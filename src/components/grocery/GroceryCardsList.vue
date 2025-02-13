<script setup lang="ts">
import type { Grocery } from '@/domain/Grocery';
import GroceryCard from '@/components/grocery/GroceryCard.vue';
  
const { groceryList, border } = defineProps({
  groceryList: {
    type: Array<Grocery> || [],
    required: true
  },
  border: {
    type: Boolean
  }
});
  
</script>
<template>
  <div class="grocery-cards-list">
    <GroceryCard v-for="grocery in groceryList" :key="grocery.id" :border="border" :grocery="grocery" />
  </div>
</template>
<style lang="scss" scoped>
.grocery-cards-list {
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
  