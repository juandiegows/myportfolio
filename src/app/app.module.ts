import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingService } from './website/services/setting.service';

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
    HttpClientModule
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
