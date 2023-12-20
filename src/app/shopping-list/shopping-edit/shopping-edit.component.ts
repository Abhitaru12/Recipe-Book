import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
 @ViewChild('nameInput') nameInputRef! : ElementRef;
 @ViewChild('amountInput') amountInputRef! : ElementRef;

constructor(private slService : ShoppinglistService){

} 
  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredients(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

}
