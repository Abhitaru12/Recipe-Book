import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private recipe : RecipeService) { }
  
  openDropDown(){
    // console.log("clicked");
  }

  onSaveData(){
    // this.recipe.storeRecipe();
    this.recipe.storeRecipe().subscribe({
      next : (res : any) =>{
        console.log(res);
      },
      error: () =>{

      },
      complete :() =>{

      }
    })
  }

  onFetch(){
    this.recipe.fetchReccipe()
  }
 
}
