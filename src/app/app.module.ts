import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';


@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        BrowserModule,
        CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
