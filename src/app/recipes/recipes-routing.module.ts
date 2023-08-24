import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "../auth/auth.gaurd.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverResolver } from "./recipe-resolver.resolver";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";


const routes : Routes = [
  {
    path: '', component: RecipesComponent, canActivate: [AuthGaurd],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverResolver] }, //Necessary to have the routes with dynamic parameters after the normal routes because for e.g. if ':id' route is above 'new' route then in localhost:4200/recipes/new the new part will be considered as a dynamic id
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverResolver] },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule{

}
