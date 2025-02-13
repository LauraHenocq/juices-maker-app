<script setup lang="ts">
import { juicesService } from '@/services';
import { ref, onMounted } from 'vue';
import { Recipe } from "@/domain/Recipe";
import type { Ref } from 'vue';
import RecipeCardsList from '@/components/recipes/RecipeCardsList.vue';
import CommonTitle from '@/components/common/Title.vue';
import CommonButton from '@/components/common/Button.vue';

const limit: Ref<number> = ref(6);
const isPending: Ref<Boolean> = ref(false);
const isError: Ref<Boolean> = ref(false);
const recipeList: Ref<Recipe[] | []> = ref([]);

async function getRecipeList(): Promise<void> {
  isError.value = false;

  const params = {
    limit: limit.value
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

const changeLimit = async () => {
  limit.value += 6;
  await getRecipeList();
};

onMounted(async () => {
  await getRecipeList();
});
</script>
<template>
  <div class="recipe-list">
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
      <RecipeCardsList :recipe-list="recipeList" border />
      <div class="recipe-list__see-more">
        <CommonButton @click="changeLimit">
          Voir plus
        </CommonButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.recipe-list {
  &__see-more {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
  