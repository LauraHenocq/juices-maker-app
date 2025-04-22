<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import RecipeCard from '@/components/recipes/RecipeCard.vue';
import GroceryCard from '@/components/grocery/GroceryCard.vue';
import CommonTitle from '@/components/common/Title.vue';
import HandleFavoriteButton from '@/components/common/HandleFavoriteButton.vue';
import Loader from '@/components/common/Loader.vue';
import { useFavoritesStore } from '@/stores/favorites.store';
import { FavoriteType } from '@/domain/Favorite';

const { favoritesList, handleItemInFavorites } = useFavoritesStore();

</script>
<template>
  <div class="container favorites-list">
    <CommonTitle>
      Mes favoris
    </CommonTitle>
    <div>
      <div class="favorites-list-cards" v-if="favoritesList.length">
        <div v-for="favorite in favoritesList">
          <div v-if="favorite.type === FavoriteType.recipes" class="favorites-list-card">
            <RecipeCard
              :key="favorite.id" 
              :recipe="favorite.item" 
              border 
            />
            <HandleFavoriteButton class="favorites-list-button" @handleFavorite="handleItemInFavorites(favorite.item)" isInFavorite />
          </div>
          <div v-else-if="favorite.type === FavoriteType.grocery" class="favorites-list-card">
            <GroceryCard 
              :key="favorite.id" 
              :grocery="favorite.item" 
              border 
            />
            <HandleFavoriteButton class="favorites-list-button" @handleFavorite="handleItemInFavorites(favorite.item)" isInFavorite/>
          </div>
        </div>
      </div>
      <p class="favorites-list__no-result" v-else>Aucun favoris</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.favorites-list {
  &__no-result { 
    margin-top: 80px;
  }

  &-cards {
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

  &-card {
    position: relative;
  }
  
  &-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>