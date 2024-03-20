import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe("Red Sause Pasta",
      "Best Seller"
      , 'https://images.aws.nestle.recipes/resized/52007da8aee0c1d4cdb98e2e5c9b03cd_Maggi_-_Easy_Creamy_Chicken_Pasta_1080_850.jpg',
      [
        new Ingredients('pasta penne', 100),
        new Ingredients('garlic', 4),
        new Ingredients('Basil', 1),
        new Ingredients('extra virgin olive oil', 1),
        new Ingredients('tomato', 2),
        new Ingredients('red chilli', 1),
      ]),
    new Recipe("Framhouse Fresh Pizza",
      "Handpicked Vegetables",
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/330px-Pizza-3007395.jpg',
      [
        new Ingredients('Pizza Dough', 1),
        new Ingredients('Tomato', 4),
        new Ingredients('Oregano', 2),
        new Ingredients('Small onion', 2),
        new Ingredients('Olive oil', 2),
        new Ingredients('Tomato sauce', 1)
      ])
  ];

  constructor(private slService: ShoppinglistService,
    private http: HttpClient) { }

  getRecipe(): any {
    return this.fetchReccipe();
  }

  storeRecipe() {
    const recipe = this.getRecipe();
    return this.http.put('https://recipe-book-9f2c7-default-rtdb.firebaseio.com/recipes.json', recipe);
  }

  fetchReccipe() {
    this.http.get<Recipe[]>('https://recipe-book-9f2c7-default-rtdb.firebaseio.com/recipes.json').subscribe(recipe => {
      // console.log(recipe);
      this.setRecipe(recipe)
    });
  }

  setRecipe(recipe : Recipe[]){
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
