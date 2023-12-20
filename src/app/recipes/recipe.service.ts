import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

 private recipes : Recipe[] = [
    new Recipe("Pasta", 
              "Red Sause Pasta"
              ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7DbKibZHxZmXQeNLc0iPe0V3UAFITibHGkflHEfcOjHWGm4tiBBkrJ2e9c6XlcWAquh0&usqp=CAU',
                [
                  new Ingredients('pasta penne',100),
                  new Ingredients('garlic',4),
                  new Ingredients('Basil',1),
                  new Ingredients('extra virgin olive oil',1),
                  new Ingredients('tomato',2),
                  new Ingredients('red chilli',1),
                ]),
    new Recipe("Pizza", 
              "Framhouse Fresh Pizza",
              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/330px-Pizza-3007395.jpg',
              [
                new Ingredients('Pizza Dough',1),
                new Ingredients('Tomato',4),
                new Ingredients('Oregano',2),
                new Ingredients('Small onion',2),
                new Ingredients('Olive oil',2),
                new Ingredients('Tomato sauce',1),
                new Ingredients('Pepper powder',1),
              ])
  ];

  getRecipe(){
    return this.recipes.slice();
  }

  constructor(private slService : ShoppinglistService){

  }
  
  addIngredientsToShoppingList(ingredients : Ingredients[]){
    this.slService.addIngredients(ingredients);
  }

}
