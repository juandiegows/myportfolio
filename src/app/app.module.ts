import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingService } from './website/services/setting.service';
import { CommonModule } from '@angular/common';

export function initApp(settingService: SettingService) {
  return () => settingService.init();
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [SettingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [SettingService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
