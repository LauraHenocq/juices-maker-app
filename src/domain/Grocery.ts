import type GroceryType from '@/domain/GroceryType'
import { EmptyError } from '@/error/EmptyError'
import { ValidationError } from '@/error/ValidationError'
import { Favorite, FavoriteType } from './Favorite';

export type GroceryApiProps = {
  _id: string;
  name: string;
  image: string;
  type: GroceryType;
  local: boolean;
  months: Array<number>;
}

export class Grocery {
  private _id: string
  private _name: string
  private _image: string
  private _type: GroceryType
  private _local: boolean
  private _months: Array<number>

  public get id () : string {
    return this._id;
  }

  public get name () : string {
    return this._name;
  }

  public get image () : string {
    return this._image;
  }

  public get type () : GroceryType {
    return this._type;
  }

  public get local () : boolean {
    return this._local;
  }

  public get months () : Array<number> {
    return this._months;
  }

  constructor (
    id: string,
    name: string,
    image: string,
    type: GroceryType,
    local: boolean,
    months: Array<number>
  ) {
    this._id = id
    this._name = name
    this._image = image
    this._type = type
    this._local = local
    this._months = months
  }

  public static fromApi (
    apiProps: GroceryApiProps
  ) {
    if (apiProps.name.length === 0) {
      throw new EmptyError('Le nom de l\'ingrédient doit être renseigné');
    }

    if (apiProps.months.length < 1) {
      throw new ValidationError('Au moins 1 mois doit être renseigné');
    }

    return new Grocery(
      apiProps._id,
      apiProps.name,
      apiProps.image,
      apiProps.type,
      apiProps.local,
      apiProps.months,
    );
  }

  public toApi (): GroceryApiProps {
    return {
      _id: this.id,
      name: this.name,
      image: this.image,
      type: this.type,
      local: this.local,
      months: this.months
    };
  }

  public equals (grocery: Grocery) {
    return this.id === grocery.id;
  }

  private isInFavorites(favorites: Favorite[] | []): Boolean {
    return favorites.length ? favorites.some(
      favorite => favorite.type === FavoriteType.grocery && 
        favorite.item.constructor === Grocery && 
          favorite.item.name === this.name) 
            : false;
  }
  
  private getFavoriteId(favorites: Favorite[] | []): string | null {
    const favorite = favorites.find(
      favorite => favorite.type === FavoriteType.grocery && 
        favorite.item.constructor === Grocery && 
          favorite.item.id === this.id);
      
    return favorite?.id ?? null;
  }
}
