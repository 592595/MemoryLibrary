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
import { SlidesPage } from "../pages/slides/slides";
import { ForgetPage } from "../pages/forget/forget";
import { PublishPage } from "../pages/publish/publish";
import { MuseumPage } from "../pages/museum/museum";
import { ProfilePage } from "../pages/profile/profile";
import { SettingfilePage } from "../pages/settingfile/settingfile";

import { UserServiceProvider } from "../providers/user-service/user-service";
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PublishServiceProvider } from '../providers/publish-service/publish-service';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

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
    SlidesPage,
    ForgetPage,
    PublishPage,
    MuseumPage,
    ProfilePage,
    SettingfilePage
  ],
  imports: [
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true
    })
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
    SlidesPage,
    ForgetPage,
    PublishPage,
    MuseumPage,
    ProfilePage,
    SettingfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    PublishServiceProvider
  ]
})
export class AppModule {}
