import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ExplorePage } from '../pages/explore/explore';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from '../pages/register/register';
import { PasswordPage } from '../pages/password/password';

import { UserServiceProvider } from "../providers/user-service/user-service";
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExplorePage,
    SettingPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PasswordPage,
    IonicStorageModule,
    HttpModule
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExplorePage,
    SettingPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PasswordPage,
    IonicStorageModule,
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}
