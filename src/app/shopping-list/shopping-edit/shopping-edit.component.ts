import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('formRef') shoppingListForm : NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edittedItem: Ingredient;

  // @ViewChild('NameInput') name : ElementRef;
  // @ViewChild('AmountInput') amount: ElementRef;

  constructor( private shoppingListService : ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editMode = true;
        this.edittedItemIndex = index;
        this.edittedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name : this.edittedItem.name,
          amount: this.edittedItem.amount
        })
      }
    )
  }

  OnAdd(form: NgForm){
    const value = form.value;
    // const IngName = this.name.nativeElement.value;
    // const IngAmount = this.amount.nativeElement.value;
    const IngName = value.name;
    const IngAmount = value.amount;
    const newIngredient = new Ingredient(IngName, IngAmount);

    if(this.editMode){
      this.shoppingListService.updateIngredient(this.edittedItemIndex, newIngredient)
    } else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.edittedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
