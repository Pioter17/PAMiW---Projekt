import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PathRoutes } from "@core/constants/routes.const";
import { AuthorizationGuardGuard } from "@core/guards/authorization-guard.guard";

export default [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthorizationGuardGuard],
    },
    {
        path: `${PathRoutes.ADD}/:id?`,
        loadComponent: ()=> import('@pages/home/components/add-movie/add-movie.component').then(mod => mod.AddMovieComponent)
    },
] as Routes