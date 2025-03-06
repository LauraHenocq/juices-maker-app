import { Recipe, RecipeApiProps } from './Recipe';
import { Grocery, GroceryApiProps } from './Grocery';

export enum FavoriteType {
  grocery = "grocery",
  recipes = "recipes"
};

type FavoriteProps = {
  _id: string;
  type: FavoriteType;
  item: Grocery | Recipe;
}

export type FavoriteApiProps = Omit<FavoriteProps, 'item'> & {
  item: GroceryApiProps | RecipeApiProps;
};

export type FavoriteItemApiPropsUnion =
  | GroceryApiProps
  | RecipeApiProps;

export class Favorite {
  private readonly _id: string
  private readonly _type: string
  private readonly _item: Grocery | Recipe

  public get id () : string {
    return this._id;
  }

  public get type () : string {
    return this._type;
  }

  public get item () : Grocery | Recipe {
    return this._item;
  }

  constructor (
    props: FavoriteProps
  ) {
    this._id = props._id;
    this._type = props.type;
    this._item = props.item;
  }

  static fromApi (
    apiProps: FavoriteApiProps
  ) {
    return new Favorite(
      {
        ...apiProps,
        item: apiProps.type ===  FavoriteType.grocery ? Grocery.fromApi(apiProps.item) : Recipe.fromApi(apiProps.item)
      }
    );
  }

  public toApi (): FavoriteApiProps {
    return {
      _id: this.id,
      type: this.getFavoriteType(),
      item: this.item.toApi()
    };
  }

  private getFavoriteType(): FavoriteType {
    return this.type === FavoriteType.grocery ? FavoriteType.grocery : FavoriteType.recipes;
  }

  private getFavoriteItem(type: FavoriteType, item: FavoriteItemApiPropsUnion): Grocery | Recipe {
    switch (type) {
      case FavoriteType.grocery:
        return Grocery.fromApi(item);
      case FavoriteType.recipes:
        return Recipe.fromApi(item);
    }
    // return typeof item === RecipeApiProps ? Recipe.fromApi(item) : Grocery.fromApi(item)
  }

  public equals (favorite: Favorite) {
    return this.id === favorite.id;
  }
}
