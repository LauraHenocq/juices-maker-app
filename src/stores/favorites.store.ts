import { Favorite } from '@/domain/Favorite';
import { Grocery } from '@/domain/Grocery';
import { Recipe } from '@/domain/Recipe';
import { juicesService } from '@/services';
import { FavoriteInput, FavoriteType } from '@/services/JuicesService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>([]);

  const addToFavorites = async (favorite: Grocery | Recipe): Promise<void> => {
    const favoriteInput: FavoriteInput = {
      type: favorite.constructor === Grocery ? FavoriteType.grocery : FavoriteType.recipes,
      item: favorite.toApi(),
    };

    try {
      const response = await juicesService.addFavorite(favoriteInput);
      if (response) favorites.value.push(response);
    } catch(err) {
      console.error(err);
    }
  };

  const setFavorites = (favoritesToAdd: Favorite[]): void => {
    favorites.value = favoritesToAdd;
  };

  const getFavorites = async (params: any): Promise<void> => {
    try {
      const favorites = await juicesService.getFavorites(params);
      if (favorites) setFavorites(favorites);
    } catch(err) {
      console.error(err);
    }
  };

  return {
    favorites,
    setFavorites,
    getFavorites,
    addToFavorites,
  };
});
