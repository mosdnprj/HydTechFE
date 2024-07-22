import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenApi } from '../models/token-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string='https://localhost:7074/api/Authentication/';
  
  

  private userPayload:any;

  
  

  constructor(private http: HttpClient, private router: Router) {
    
    this.userPayload = this.decodedToken();
   }
  signUp(userobj :any,role :any)
  {
    return this.http.post<any>(`${this.baseUrl}Register?role=${role}`,userobj,role);
  }

  signIn(loginobj :any)
  {
    return this.http.post<any>(`${this.baseUrl}login`,loginobj);    
  }

  signIn2FA(code :any,username :any)
  {
    
    return this.http.post<any>(`${this.baseUrl}login-2FA?code=${code}&username=${username}`,code,username); 
  }

  storeToken(tokenValue:string)
  {
    localStorage.setItem('token',tokenValue)
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken()
  {
    return localStorage.getItem('token')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn():boolean
  {
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApi){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }

}
