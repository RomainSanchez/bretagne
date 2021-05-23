import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './login/auth-guard.service';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : MapComponent },
  { path: 'admin', component: ListComponent, /*canActivate: [AuthGuardService] */},
  { path: 'register', component: RegisterComponent, /* canActivate: [AuthGuardService] */},
  { path: 'locations', component: ListComponent, /*canActivate: [AuthGuardService]*/ },
{ path: 'locations/new', component: FormComponent, /*canActivate: [AuthGuardService]*/ },
  { path: 'location/:id', component: FormComponent, /*canActivate: [AuthGuardService] */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
