import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { PalletteComponent } from './components/pallette/pallette.component';
import { ModeDarkLightComponent } from './components/mode-dark-light/mode-dark-light.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { LevitateIconComponent } from './components/levitate-icon/levitate-icon.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { CarouselImageComponent } from './components/carousel-image/carousel-image.component';
import { MyServicesComponent } from './components/my-services/my-services.component';
import { ClientComponent } from './components/client/client.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ImageComponent,
    PalletteComponent,
    ModeDarkLightComponent,
    IntroductionComponent,
    LevitateIconComponent,
    AboutMeComponent,
    SanitizeHtmlPipe,
    CarouselImageComponent,
    MyServicesComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
