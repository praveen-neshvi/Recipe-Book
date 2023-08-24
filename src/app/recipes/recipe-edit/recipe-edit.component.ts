import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number;
  editMode = false;
  recipeForm : FormGroup;
  recipe : Recipe;
  recipeName : string = '';
  recipeImagePath : string = '';
  recipeDescription:  string = '';
  imageURL: string = '';


  constructor( private activatedRoute : ActivatedRoute,
               private recipeService: RecipeService,
               private formBuilder: FormBuilder,
               private router: Router ) {}

  ngOnInit(): void
  {
      this.activatedRoute.params.subscribe(
        (parameters : Params) => {
          this.id = parameters['id'];
          this.editMode = parameters['id'] != null;
          // this.initForm();
        }
      );


      this.recipe = this.recipeService.getRecipeById(this.id);
      if(this.editMode){
        this.recipeImagePath = this.recipe.imagePath;
        this.recipeName = this.recipe.name;
        this.recipeDescription = this.recipe.description;
      }

      this.recipeForm = this.formBuilder.group({
        name: [this.recipeName, Validators.required],
        imagePath: [this.recipeImagePath, Validators.required],
        description: [this.recipeDescription, Validators.required],
        ingredients: this.formBuilder.array([])
      });

      if(this.editMode)
      {
        if(this.recipe['ingredients']){
          for( let ingredient of this.recipe.ingredients){
            const IngredientGroup =  this.formBuilder.
            group(
              {
                name: [ingredient.name, Validators.required],
                amount: [ingredient.amount, [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) ]]
              });
            this.ingredients.push(IngredientGroup);
          }
        }

      }

  }

  get ingredients() {
		return this.recipeForm.get('ingredients') as FormArray;
	}

  // private initForm(){

  //   // let recipeName = '';
  //   // let recipeImagePath = '';
  //   // let recipeDescription = '';
  //   // let        //Form Builder is used because normal way of creating formArrays is not working

  //   if(this.editMode){
  //     // const recipe = this.recipeService.getRecipeById(this.id);
  //     // recipeName = recipe.name;
  //     // recipeImagePath = recipe.imagePath;
  //     // recipeDescription = recipe.description;

  //     if(recipe['ingredients']){
  //       for( let ingredient of recipe.ingredients){
  //         const IngredientGroup =  this.formBuilder.group({
  //           name: [ingredient.name],
  //           amount: [ingredient.amount],
  //         });

  //         ingredients.push(IngredientGroup)
  //       }
  //     }

  //   }

  //   this.recipeForm = new FormGroup({
  //     'name': new FormControl(recipeName),
  //     'imagePath' : new FormControl(recipeImagePath),
  //     'description': new FormControl(recipeDescription),
  //     'ingredients':  this.formBuilder.array([])
  //   });
  // }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount': new FormControl(null,  [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) ])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
