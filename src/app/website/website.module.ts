import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule,NgOptimizedImage  } from '@angular/common';
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
import { SkillsComponent } from './components/skills/skills.component';
import { AlertInfoComponent } from './components/alert-info/alert-info.component';
import { ProjectsComponent  as ProjectsCardComponent } from './components/projects/projects.component';
import { MyStoryComponent } from './components/my-story/my-story.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { FormContactMeComponent } from './components/form-contact-me/form-contact-me.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetDiffMonthPipe } from './pipes/get-diff-month.pipe';
import { TopicPipe } from './pipes/topic.pipe';
import { GetFormattedDatesPipe } from './pipes/get-formatted-dates.pipe';
import { UpButtomComponent } from './components/up-buttom/up-buttom.component';
import { SearchComponent } from './pages/search/search.component';
import { ProjectsComponent as PagesProjectsComponent   } from './pages/projects/projects.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SlidingModalComponent } from './components/sliding-modal/sliding-modal.component';
import { ImageOptimizedComponent } from './components/image-optimized/image-optimized.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { TimelineComponent } from "./components/timeline/timeline.component";

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
    ClientComponent,
    SkillsComponent,
    AlertInfoComponent,
    ProjectsCardComponent,
    MyStoryComponent,
    BlogsComponent,
    FormContactMeComponent,
    FooterComponent,
    GetDiffMonthPipe,
    GetFormattedDatesPipe,
    TopicPipe,
    UpButtomComponent,
    SearchComponent,
    PagesProjectsComponent,
    ArticlesComponent,
    SlidingModalComponent,
    ImageOptimizedComponent,
    ParticlesComponent ,

    TimelineComponent
  ],
  exports: [
    ProjectsCardComponent ,
    ParticlesComponent  
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebsiteModule { }
