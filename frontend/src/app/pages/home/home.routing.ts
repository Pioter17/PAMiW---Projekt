import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PathRoutes } from "@core/constants/routes.const";

export default [
    {
        path: '',
        component: HomeComponent,
        // canActivate: [],
    },
    {
        path: `${PathRoutes.ADD}/:id?`,
        loadComponent: ()=> import('@pages/home/components/add-movie/add-movie.component').then(mod => mod.AddMovieComponent)
    },
] as Routes