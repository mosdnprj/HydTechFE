import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import ValidateForm from '../../helpers/validationform';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    RouterModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          //console.log(res.message);
          //console.log(res.token.result);
          this.loginForm.reset();
          //this.auth.storeToken(res.token.result);
          //this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          //console.log(tokenPayload);
          //console.log(tokenPayload.name);
          //this.userStore.setFullNameForStore(tokenPayload.name);
          //this.userStore.setRoleForStore(tokenPayload.role);
          //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          //this.router.navigate(['otp-verification'])
          this.router.navigate(['validatecode'])
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
