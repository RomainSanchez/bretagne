import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './edit/edit.component';
import { MapComponent } from './map/map.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './login/auth-guard.service';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : AppComponent },
  { path: 'location/:id', component: EditComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  { path: 'locations', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, /* canActivate: [AuthGuardService] */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
