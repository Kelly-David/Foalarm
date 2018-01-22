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
import { Alert } from './alert';
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
import { ActiveHorseComponent } from './horse/active-horse/active-horse.component';
import { AlarmListComponent } from './alarm/alarm-list/alarm-list.component';
import { AlarmService } from './alarm/alarm.service';
import { ActiveAlarmListComponent } from './alarm/active-alarm-list/active-alarm-list.component';
import { AlarmEditComponent } from './alarm/alarm-edit/alarm-edit.component';
import { AlarmSelectComponent } from './alarm/alarm-select/alarm-select.component';
import { SelectModule } from 'ng2-select';
import { AlertListComponent } from './alerts/alert-list/alert-list.component';
import { AlertsService } from './alerts/alerts.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NavListComponent } from './nav/nav-list/nav-list.component';
import { SlicePipe } from '@angular/common';
import { AlertEditComponent } from './alerts/alert-edit/alert-edit.component';
import { CameraListComponent } from './cams/camera-list/camera-list.component';
import { CameraViewComponent } from './cams/camera-view/camera-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    RegisterComponent,
    ProfileComponent,
    UtilityComponent,
    HorseListComponent,
    HorseEditComponent,
    ActiveHorseComponent,
    AlarmListComponent,
    ActiveAlarmListComponent,
    AlarmEditComponent,
    AlarmSelectComponent,
    AlertListComponent,
    NavListComponent,
    AlertEditComponent,
    CameraListComponent,
    CameraViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, CoreModule, AppRoutingModule, // imports firebase/auth, only needed for auth features
    SelectModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertHandlerService,
    HorseService,
    FirestoreService,
    AlarmService,
    AlertsService,
    SlicePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
