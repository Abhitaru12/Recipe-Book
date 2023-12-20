import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients! : Ingredients[];

  constructor(private slService : ShoppinglistService){

  }

  ngOnInit() {
      this.ingredients = this.slService.getIngredients();
      this.slService.ingredientChanged.subscribe(
        (ingredient : Ingredients[]) =>{
          this.ingredients = ingredient;
        }
      )
  }

}
