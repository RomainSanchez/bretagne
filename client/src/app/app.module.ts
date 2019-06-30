import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { SDKBrowserModule } from './shared/sdk/index';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    AdminComponent,
    ListComponent,
    FormComponent
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
    FormsModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
