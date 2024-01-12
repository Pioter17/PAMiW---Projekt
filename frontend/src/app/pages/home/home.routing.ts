import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PathRoutes } from "@core/constants/routes.const";
import { AuthorizationGuardGuard } from "@core/guards/authorization-guard.guard";

export default [
  {
    path: '',
    redirectTo: PathRoutes.MOVIES,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthorizationGuardGuard],
    children: [
      {
        path: PathRoutes.MOVIES,
        loadComponent: ()=> import('@pages/home/components/display-movies/display-movies.component').then(mod => mod.DisplayMoviesComponent)
      },
      {
        path: PathRoutes.DIRECTORS,
        loadComponent: ()=> import('@pages/home/components/display-directors/display-directors.component').then(mod => mod.DisplayDirectorsComponent)
      },
      {
          path: `${PathRoutes.ADD}/:id?`,
          loadComponent: ()=> import('@pages/home/components/add-movie/add-movie.component').then(mod => mod.AddMovieComponent)
      },
    ]
  }
] as Routes
