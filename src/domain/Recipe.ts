import { EmptyError } from '@/error/EmptyError'

type RecipeApiProps = {
  _id: string;
  title: string;
  preparation: string;
  quantityOfJuice: string;
  ingredients: Array<GroceryItem>;
  description: string;
  season: string;
  goodToKnow: string; 
}

export type GroceryItem = {
  grocery_id: string;
  name: string;
  quantity: number;
}

export class Recipe {
  private _id: string;
  private _title: string;
  private _preparation: string;
  private _quantityOfJuice: string;
  private _ingredients: Array<GroceryItem>;
  private _description: string;
  private _season: string;
  private _goodToKnow: string;

  public get id () : string {
    return this._id;
  }

  public get title () : string {
    return this._title;
  }

  public get preparation () : string {
    return this._preparation;
  }

  public get quantityOfJuice () : string {
    return this._quantityOfJuice;
  }

  public get ingredients () : Array<GroceryItem> {
    return this._ingredients;
  }

  public get season () : string {
    return this._season;
  }

  public get description () : string {
    return this._description;
  }

  public get goodToKnow () : string {
    return this._goodToKnow;
  }

  constructor (
    _id: string,
    title: string,
    preparation: string,
    quantityOfJuice: string,
    ingredients: Array<GroceryItem>,
    season: string,
    description: string,
    goodToKnow: string,
  ) {
    this._id = _id,
    this._title = title,
    this._preparation = preparation,
    this._quantityOfJuice = quantityOfJuice,
    this._ingredients = ingredients,
    this._season = season,
    this._goodToKnow = goodToKnow,
    this._description = description
  }

  public static fromApi (
    apiProps: RecipeApiProps
  ) {
    if (apiProps.title.length === 0) {
      throw new EmptyError('Le titre la recette doit être renseigné');
    }

    return new Recipe(
      apiProps._id,
      apiProps.title,
      apiProps.preparation,
      apiProps.quantityOfJuice,
      apiProps.ingredients,
      apiProps.season,
      apiProps.goodToKnow,
      apiProps.description,
    );
  }

  public equals (recipe: Recipe) {
    return this.id === recipe.id;
  }
}
