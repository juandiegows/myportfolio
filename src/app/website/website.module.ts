import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { PalletteComponent } from './components/pallette/pallette.component';
import { ModeDarkLightComponent } from './components/mode-dark-light/mode-dark-light.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ImageComponent,
    PalletteComponent,
    ModeDarkLightComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
