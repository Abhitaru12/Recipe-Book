import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredients[];
  private igChangeSub !: Subscription;

  constructor(private slService: ShoppinglistService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientChanged.subscribe(
      (ingredient: Ingredients[]) => {
        this.ingredients = ingredient;
      })
  }
  onIngredientAdded(ingredient : Ingredients){
    this.ingredients.push(ingredient);
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

}
