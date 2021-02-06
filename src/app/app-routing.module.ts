import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },  
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
    { path: 'contas', loadChildren: './pages/contas/contas.module#ContasModule' },
    { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule' }    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
