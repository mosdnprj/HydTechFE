import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MastermenuComponent } from './mastermenu/mastermenu.component';
import { ValidatecodeComponent } from './components/validatecode/validatecode.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'Mastermenu',
        component:MastermenuComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'validatecode',
        component:ValidatecodeComponent
    }

];
