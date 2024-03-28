import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated : boolean = false;
  private userSub! : Subscription;

  constructor(private recipe : RecipeService, private authService : AuthService) { }
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user  =>{
      this.isAuthenticated = !user ? false : true;
    });
  }

  onSaveData(){
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
    this.recipe.fetchRecipe()
  }

  onLogOut(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
 
}
