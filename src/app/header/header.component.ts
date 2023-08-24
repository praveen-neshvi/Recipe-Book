import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    @Output() featureSelected = new EventEmitter<string>();

    collapsed = true;
    UserSubscription : Subscription;
    isAuthenticated : boolean;

    constructor(private dataStorageService : DataStorageService,
                private authService : AuthService) {}

    ngOnInit(): void {
        this.UserSubscription = this.authService.userSubject.subscribe(user => {
          this.isAuthenticated = user ? true : false;
        })
    }

    OnSelect(selectedLink : any){
        this.featureSelected.emit(selectedLink);
    }

    OnSaveData(){
      this.dataStorageService.storeRecipes()
    }

    OnGetData(){
      this.dataStorageService.fetchRecipes().subscribe(res =>{
        console.log(res)
      });
    }

    onLogout(){
      this.authService.logout();
    }

    ngOnDestroy(): void {
        this.UserSubscription.unsubscribe();
    }
}
