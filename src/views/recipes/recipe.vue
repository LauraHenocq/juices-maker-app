<script setup lang="ts">
import { juicesService } from '@/services';
import { ref, onMounted } from 'vue';
import { Recipe } from "@/domain/Recipe";
import type { Ref } from 'vue';
import CommonTitle from '@/components/common/Title.vue';
import Loader from '@/components/common/Loader.vue';
import RecipeInformation from '@/components/recipes/RecipeInformation.vue';
import { useToasted } from '@/composables/common/useToasted';
import { useRoute } from 'vue-router';

const route = useRoute(); 
const toasted = useToasted();

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
  } catch {
    isError.value = true;
    toasted.error('Une erreur est survenue lors de la récupération de la recette');
  } finally {
    isPending.value = false;
  }
};

onMounted(async () => {
  await getRecipe();
});
</script>
<template>
  <div class="container recipe-content">
    <CommonTitle v-if="recipe">
      {{ recipe.title }}
    </CommonTitle>
    <div v-if="isPending">
      <Loader />
      <p>Chargement en cours...</p>
    </div>
    <div v-else-if="isError">
      <p class="center">Une erreur est survenue lors du chargement des données</p>
    </div>
    <RecipeInformation v-else-if="recipe" :recipe="recipe" />
  </div>
</template>
<style lang="scss" scoped>
.recipe-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media (min-width: $desktop-breakpoint) {
    gap: 50px;
  }
}
</style>