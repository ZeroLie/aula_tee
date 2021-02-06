import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CadastroPage } from './cadastro/cadastro.page';
import { ListaPage } from './lista/lista.page';
import { RelatorioPage } from './relatorio/relatorio.page';

const routes: Routes = [
    {
        path: '', children: [
            {path: 'pagar', component: ListaPage},
            {path: 'receber', component: ListaPage},
            {path: 'cadastro', component: CadastroPage},
            {path: 'relatorio', component: RelatorioPage},
        ]
    },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ListaPage,
        CadastroPage,
        RelatorioPage
    ]
})
export class ContasRoutingModule { }
