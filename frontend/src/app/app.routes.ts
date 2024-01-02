import { Routes } from '@angular/router';
import { PathRoutes } from '@core/constants/routes.const';

export const routes: Routes = [
    {
        path: '',
        redirectTo: PathRoutes.HOME,
        pathMatch: "full"
    },
    {
        path: PathRoutes.HOME,
        loadChildren: ()=> import('@pages/home/home.routing'),
    },
    {
        path: PathRoutes.AUTH,
        loadChildren: ()=> import('@pages/auth/auth.routing'),
    },
    {
        path: "**",
        loadChildren: ()=> import('@pages/home/home.routing')
    }
];
