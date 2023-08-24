import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService : AuthService,
              private router: Router) {}

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error:string = '';

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;

  }

  handleClose(){
    this.error = '';
  }

  onSubmit(form: NgForm){
    const email = form.value.Email;
    const password = form.value.Password;

    this.isLoading = true;

    let authObservable : Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      (responseData) => {
        console.log(responseData)
        this.isLoading = false
        this.router.navigate(['/recipes']); //navigate or redirect to somewhere upon successful login or signup
      },
      err => {
        console.log(err)

        this.error = err;
        this.isLoading = false
      }
    );


    form.reset()
  }
}
