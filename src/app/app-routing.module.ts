import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { authGuardGuard } from "./auth/auth-guard.guard";

const appRoutes : Routes = [
    { path : '', redirectTo: '/recipes', pathMatch:'full' },
    { path : 'recipes', component : RecipesComponent, canActivate : [authGuardGuard], children: [
        { path : 'new', component : RecipeEditComponent  },
        { path : ':id', component : RecipeDetailComponent },
        { path : ':id/edit', component : RecipeEditComponent  }
    ]}, 
    { path : 'shopping-list', component : ShoppingListComponent , canActivate : [authGuardGuard]},
    { path : 'auth', component: AuthComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingMOdule{

}