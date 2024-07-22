import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    RouterModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  public SignupForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.SignupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      emailaddress: ['',Validators.required],
      mobileno: ['',Validators.required],
    });
  }

  onSubmit() {    
    console.log(this.SignupForm.value);
    console.log(this.SignupForm.valid);
    if (this.SignupForm.valid) {
      console.log(this.SignupForm.value);
      this.auth.signUp(this.SignupForm.value,'HR').subscribe({
        next: (res) => {
          //console.log(res.message);
          //console.log(res.token.result);
          this.SignupForm.reset();
          //this.auth.storeToken(res.tokeny.result);
          //this.auth.storeRefreshToken(res.refreshToken);
          //const tokenPayload = this.auth.decodedToken();
          //console.log(tokenPayload);
          //console.log(tokenPayload.name);
          //this.userStore.setFullNameForStore(tokenPayload.name);
          //this.userStore.setRoleForStore(tokenPayload.role);
          //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          //this.router.navigate(['otp-verification'])
          this.router.navigate(['login'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          console.log(err);
        },
      });
    } else {
      //ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
