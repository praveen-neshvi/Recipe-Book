import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';



@Injectable()
export class RecipeService{

  recipesChanged = new Subject<Recipe[]>;

  // private recipes: Recipe[] = [
  //   new Recipe('Greek Soy Pizza', 'Inherited from the rich spices of Greek with a spill of soy souce.',
  //   'https://www.simplyrecipes.com/thmb/4_wTLA6Q_2o7dgNO-ze0w7oeX_w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
  //    [
  //       new Ingredient('Feta', 3),
  //       new Ingredient('Spinach', 2),
  //       new Ingredient ('Olives', 10)
  //    ]),
  //   new Recipe('Pepperoni Pizza', 'Has toppings of  crispy, salty round of pepperoni',
  //   'https://sipbitego.com/wp-content/uploads/2021/08/Pepperoni-Pizza-Recipe-Sip-Bite-Go.jpg',
  //   [
  //       new Ingredient('Pepperoni', 20),
  //       new Ingredient('Mozilla Cheese', 5),
  //       new Ingredient ('Dough', 1)
  //   ])
  // ];


  private recipes : Recipe[] = [];

  constructor (private shoppingListService : ShoppingListService) {}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppinList(ingredients : Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
