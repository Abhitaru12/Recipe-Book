import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
ingredientChanged = new Subject<Ingredients[]>();
startedEditing = new Subject<number>();  

  private ingredients: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index : number){
    return this.ingredients[index];
  }

  addIngredient(ingredient : Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredient : Ingredients[]){
    // for(let ingredients of ingredient){
    //   this.addIngredient(ingredients);
    // }
    this.ingredients.push(...ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index : number, newIngredient : Ingredients){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index : number){
    this.ingredients.splice(index , 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
