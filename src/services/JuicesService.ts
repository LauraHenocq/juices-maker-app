import { Grocery, GroceryApiProps } from "@/domain/Grocery";
import type ApiClient from "./ApiClient";
import { Recipe, RecipeApiProps } from "@/domain/Recipe";
import { Favorite, FavoriteApiProps } from "@/domain/Favorite";

export type GetRecipeListParams = {
  limit: number;
  ingredients: [string] | null;
}

export enum FavoriteType {
  recipes = 'recipes',
  grocery = 'grocery',
}

export type FavoriteInput = {
  type: FavoriteType,
  item: GroceryApiProps | RecipeApiProps,
}

// Dedicated to manage APIs calls related to juices API
class JuicesService {
  apiClient: ApiClient;
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getGroceryList(params: any): Promise<Grocery[] | []> {
    const request ={
      url: '/grocery',
      params,
    };

    const response = await this.apiClient.sendRequest(request);

    return response?.data.length ? response.data.map(Grocery.fromApi) : [];
  }

  async getRecipeList(params: GetRecipeListParams): Promise<Recipe[] | []> {
    const request = {
      url: '/recipes',
      params,
    };

    const response = await this.apiClient.sendRequest(request);

    return response?.data.length ? response.data.map(Recipe.fromApi) : [];
  }

  async getRecipe(params: any): Promise<Recipe | null> {
    const request = {
      url: `/recipes/${params.id}`,
      params
    };

    const response = await this.apiClient.sendRequest(request);

    return Recipe.fromApi(response.data) ?? null;
  }

  async getFavorites(params: any): Promise<Favorite[] | []> {
    const request = {
      url: '/favorites',
      params,
    };

    const response = await this.apiClient.sendRequest(request);
    return response?.data.length ? response.data.map(Favorite.fromApi) : [];
  }

  async addFavorite(params: FavoriteInput): Promise<Favorite | null> {
    const url = '/favorites';

    const response = await this.apiClient.post(url, params);
    return response?.data ? Favorite.fromApi(response.data) : null;
  }
}

export default JuicesService;