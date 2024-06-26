import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppinglistService } from './shopping-list/shoppinglist.service';
import { AppRoutingMOdule } from './app-routing.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthInterceptorServiceService } from './shared/auth-interceptor-service.service';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeEditComponent,
    AuthComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingMOdule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [ShoppinglistService, RecipeService, AuthService , {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptorServiceService, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
