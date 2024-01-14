import { Routes } from "@angular/router";
import { PathRoutes } from "@core/constants/routes.const";
import { AuthComponent } from "./auth.component";


export default [
    {
        path: '',
        redirectTo: PathRoutes.LOGIN,
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: PathRoutes.LOGIN,
                loadComponent: () => import('@pages/auth/components/login/login.component').then(mod => mod.LoginComponent),
            },
            {
                path: PathRoutes.REGISTER,
                loadComponent: () => import('@pages/auth/components/register/register.component').then(mod => mod.RegisterComponent),
            },
            {
              path: 'google',
              loadComponent: () => import('@pages/auth/components/google/google.component').then(mod => mod.GoogleComponent),
            }
        ]
    }
] as Routes
