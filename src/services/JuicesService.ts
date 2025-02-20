import { Grocery } from "@/domain/Grocery";
import type ApiClient from "./ApiClient";
import { Recipe } from "@/domain/Recipe";

export type GetRecipeListParams = {
  limit: number;
  ingredients: [string] | null;
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
      params: params
    };

    const response = await this.apiClient.sendRequest(request);

    return response?.data.length ? response.data.map(Grocery.fromApi) : [];
  }

  async getRecipeList(params: GetRecipeListParams): Promise<Recipe[] | []> {
    const request = {
      url: '/recipes',
      params: params
    };

    const response = await this.apiClient.sendRequest(request);

    return response?.data.length ? response.data.map(Recipe.fromApi) : [];
  }

  async getRecipe(params: any): Promise<Recipe | null> {
    const request = {
      url: `/recipes/:${params.id}`,
      params
    };

    const response = await this.apiClient.sendRequest(request);

    return Recipe.fromApi(response.data[0]) ?? null;
  }
}

export default JuicesService;