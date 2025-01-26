import { Routes } from '@angular/router';
import { FormTaskComponent } from './form-task/form-task.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


export const routes: Routes = [
    {path: 'taskForm', component: FormTaskComponent , canActivate: [AuthGuardService]},
    {path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    
];
