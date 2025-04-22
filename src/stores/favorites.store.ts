import { Favorite } from '@/domain/Favorite';
import { Grocery } from '@/domain/Grocery';
import { Recipe } from '@/domain/Recipe';
import { juicesService } from '@/services';
import { FavoriteInput, FavoriteType } from '@/services/JuicesService';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>([]);

  const favoritesList = computed(() => favorites.value);

  const handleItemInFavorites = (favorite: Grocery | Recipe): void => {
    favorite.isInFavorites(favorites.value) ? deleteFromFavorites(favorite.getFavoriteId(favorites.value)) : addToFavorites(favorite);
  }

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

  const deleteFromFavorites = async (favoriteId: string): Promise<void> => {
    try {
      const response = await juicesService.deleteFavorite(favoriteId);
      if (response) {
        favorites.value = favorites.value.reduce((acc, item) => {
          if (item.id !== favoriteId) {
              acc.push(item);
          }
          return acc;
        }, []);
      }
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
    favoritesList,
    setFavorites,
    getFavorites,
    addToFavorites,
    deleteFromFavorites,
    handleItemInFavorites,
  };
});
