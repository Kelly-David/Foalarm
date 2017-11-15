import 'hammerjs';
import 'firebase/storage'; // global firebase storage  js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyService } from './company/company.service';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { ContactService } from './contact/contact.service';
import { Contact } from './contact';
import { User } from './user';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertHandlerService } from './alert-handler.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './admin/login/login.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserService } from './admin/user.service';

const firebaseConfig = {
  apiKey: 'AIzaSyBTOPa5uzjOZqisZwlCgRw04JNZimBbV8U',
  authDomain: 'angularfireapp-c5e67.firebaseapp.com',
  databaseURL: 'https://angularfireapp-c5e67.firebaseio.com',
  projectId: 'angularfireapp-c5e67',
  storageBucket: 'angularfireapp-c5e67.appspot.com',
  messagingSenderId: '294506790933'
};

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent,
    CompanyListComponent,
    ContactEditComponent,
    ContactListComponent,
    HomeComponent,
    LoginPageComponent,
    ProfileComponent,
    RegistrationComponent,
    LoginComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    CompanyService,
    ContactService,
    AuthService,
    AuthGuard,
    AlertHandlerService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
