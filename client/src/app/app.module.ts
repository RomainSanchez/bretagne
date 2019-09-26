import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatDividerModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule, MatSnackBarModule, MatPaginatorModule, MatSortModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { SDKBrowserModule } from './shared/sdk/index';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './login/auth-guard.service';
import { EditComponent } from './edit/edit.component';
import { DialogComponent } from './dialog/dialog.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    AdminComponent,
    ListComponent,
    FormComponent,
    RegisterComponent,
    EditComponent,
    DialogComponent,
    SafeHtmlPipe
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    AppRoutingModule
  ],
providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
