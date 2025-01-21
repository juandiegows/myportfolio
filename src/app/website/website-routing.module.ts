import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ArticlesComponent } from './pages/articles/articles.component';

const routes: Routes = [
  {
    path: ':lang/search',
    component: SearchComponent,
  },
  {
    path: ':lang/projects',
    component: ProjectsComponent,
  },
  {
    path: ':lang/blogs',
    component: ArticlesComponent,
  },
  {
    path: ':lang/:id',
    component: HomeComponent,
  },
  {
    path: ':lang',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/es',
    pathMatch: 'full', // Redirigir a la versión en español por defecto
  },
  {
    path: '**',
    redirectTo: '/es', // Redirigir cualquier ruta no encontrada
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
