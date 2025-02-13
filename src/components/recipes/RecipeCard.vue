<script setup lang="ts">
import { Recipe } from '@/domain/Recipe';
import { ref, computed }  from 'vue';
  
const { recipe, border } = defineProps({
  recipe: {
    type: Recipe,
    required: true
  },
  border: {
    type: Boolean
  }
});


const goToRecipe = computed(() => {
    return `/recipes?name=${recipe.title.toLowerCase().replaceAll(' ', '-')}`;
});

const preparationTime = computed(() => {
  const hours = recipe.preparation.hours > 0 ? `${recipe.preparation.hours}h` : '';
  const minutes = recipe.preparation.minutes > 0 ? `${recipe.preparation.minutes}min` : '';
  return `Temps de préparation : ${hours}${minutes}`;
});

const isCardHover = ref(false);

</script>
<template>
  <router-link 
    :to="goToRecipe"
    :class="['recipe-card', { 'recipe-card--border': border }]" 
    @mouseover="isCardHover = true" 
    @mouseleave="isCardHover = false"
  >
    <img
      class="recipe-card__picture"
      src="@/assets/icons/logo.png"
      alt="Photo d'un jus"
    />
    <div class="recipe-card__content">
      <div v-if="isCardHover" class="recipe-card__content__button">
          Consulter la recette →
      </div>
      <div v-else>
        <h3 class="recipe-card__content__title">
          {{ recipe.title }}
        </h3>
        <div class="recipe-card__content__info">
          <p>{{ recipe.quantityOfJuice }}</p>
          <p>{{ preparationTime }}</p>
        </div>  
      </div>
    </div>
  </router-link>
</template>
<style scoped lang="scss">
.recipe-card {
  position: relative;
  display: grid;
  grid-template-columns: 5fr 4fr;
  grid-template-rows: auto auto 1fr;
  align-items: stretch;
  column-gap: 16px;
  row-gap: 32px;
  padding: 32px 16px;
  background-color: #fff;
  border-radius: $radius;
  height: 312px;
  max-height: 370px;
  grid-template-areas:
    'picture picture'
    'content content'
    'content content';
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  transition: all 100ms;
}

.recipe-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.recipe-card:hover.recipe-card::after {
  position: absolute;
  border-radius: $radius $radius;
  background-color: $secondary;
  opacity: 0.65;
  color: #fff;
  height: 100%;
  width: 100%;
  transition: all 300ms;
  @include keyframes(fadeIn) {
    0% { 
      opacity: 0; 
    }
    100% { 
      opacity: 0.65; 
    }
  }
  @include animate(fadeIn, 1s, linear, 1);
}

.recipe-card__content:hover {
  transform: scale(1.05);
}
  
.recipe-card::before {
  position: absolute;
  content: '';
  top: -8px;
  left: 8px;
  border: 1px solid $tertiary;
  border-radius: $radius;
  opacity: 0.7;
  height: 100%;
  width: 100%;
  background-position: bottom;
}

.recipe-card__picture {
  grid-area: picture;
  border-bottom-left-radius: $radius;
  border-top-left-radius: $radius;
  width: 144px;
  height: 144px;
  object-fit: contain;
  margin: auto;
  transition: all 300ms;
}
.recipe-card:hover .recipe-card__picture {
  transform: scale(1.2);
}

.recipe-card__content {
  grid-area: content;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 8px;
}

.recipe-card__content__title {
  color: $secondary;
  font-size: 18px;
  font-weight: normal;
  text-transform: uppercase;
  margin: 0;
  word-break: break-word;
}

.recipe-card__content__button {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  color: $dark;
  text-transform: uppercase;
  text-shadow: 3px 3px 5px $secondary;
}
.recipe-card--border {
  border: 1px solid $quaternary;
}
.recipe-card--width {
  max-width: 400px;
}
  
@media screen and (max-width: 960px) {
  .recipe-card {
    row-gap: 24px;
  }
  .recipe-card__content__title {
    letter-spacing: 5px;
    font-size: 18px;
  }
}
  
@keyframes zoomInAndOut {
  to {
    transform: scale(1.2)
  }
}
</style>
  