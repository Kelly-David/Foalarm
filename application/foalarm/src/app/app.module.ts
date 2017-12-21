import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { User } from './user';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AlertHandlerService } from './alert-handler.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UtilityComponent } from './utility/utility.component';
import { HorseListComponent } from './horse/horse-list/horse-list.component';
import { HorseService } from './horse/horse.service';
import { HorseEditComponent } from './horse/horse-edit/horse-edit.component';
import { FirestoreService } from './firestore.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    RegisterComponent,
    ProfileComponent,
    UtilityComponent,
    HorseListComponent,
    HorseEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, CoreModule, AppRoutingModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertHandlerService,
    HorseService,
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
