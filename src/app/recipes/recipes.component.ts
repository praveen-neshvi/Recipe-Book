import { Component } from "@angular/core";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent{
    constructor( private recipeService : RecipeService,
                 private dataStorageService : DataStorageService) {}

    ngOnInit(): void {
      // this.dataStorageService.fetchRecipes().subscribe();
    }
}
