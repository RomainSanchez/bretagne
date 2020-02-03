import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatDividerModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule,
  MatGridListModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatTooltipModule
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
import { DialogComponent } from './dialog/dialog.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MediaPipe } from './pipe/media.pipe';
import { GalleryModule } from '@ngx-gallery/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    AdminComponent,
    ListComponent,
    FormComponent,
    RegisterComponent,
    DialogComponent,
    SafeHtmlPipe,
    MediaPipe,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    DialogComponent,
    ConfirmationDialogComponent
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
    MatTooltipModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    AppRoutingModule,
    GalleryModule,
    BrowserAnimationsModule

  ],
providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
