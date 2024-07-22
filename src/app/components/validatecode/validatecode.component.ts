import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validatecode',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    RouterModule,CommonModule,HttpClientModule],
  templateUrl: './validatecode.component.html',
  styleUrl: './validatecode.component.scss'
})
export class ValidatecodeComponent implements OnInit {
  public validatecodeForm!: FormGroup;  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ){}

  ngOnInit() {
    this.validatecodeForm = this.fb.group({
      codeusername: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  oncodeSubmit() {
    console.log(this.validatecodeForm.valid);
    if (this.validatecodeForm.valid) {
      console.log(this.validatecodeForm.value);
      this.auth.signIn2FA(this.validatecodeForm.value.code,this.validatecodeForm.value.codeusername).subscribe({
        next: (res) => {
          console.log(res);
          //console.log(res.type(token).text);
          this.validatecodeForm.reset();
          //this.auth.storeToken(res.token.result);
          //this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          console.log(tokenPayload);
          //console.log(tokenPayload.name);
          //this.userStore.setFullNameForStore(tokenPayload.name);
          //this.userStore.setRoleForStore(tokenPayload.role);
          //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          //this.router.navigate(['otp-verification'])
          this.router.navigate(['dashboard'])
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