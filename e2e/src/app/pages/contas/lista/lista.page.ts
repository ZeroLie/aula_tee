import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContaService } from '../service/conta-service';

@Component({
    selector: 'lista',
    templateUrl: './lista.page.html',
    styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
    listaContas;
    tipo;

    constructor(
        private conta: ContaService,
        private alert: AlertController,
        private router: Router
    ) {}

    ngOnInit() {
        const url =this.router.url;
        const tipo = url.split('/')[2];
        this.tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        this.conta.lista(tipo).subscribe(x => this.listaContas = x);  
    }

    async remove(conta) {
        const confirm = await this.alert.create({
            header: 'Remover Conta',
            message: 'Deseja, realmente, apagar esta conta?',
            buttons: [{
                    text: 'Cancelar',
                    role: 'cancel'
                }, {
                    text: 'Deletar',
                    handler: () => this.conta.remove(conta)
                }
            ]
        });

        confirm.present();     
    }

    async edita(conta) {
        const confirm = await this.alert.create({
            header: 'Editar Conta',
            inputs: [
                {
                    name: 'parceiro',
                    value: conta.parceiro,
                    placeholder: 'Parceiro Comercial'
                },
                {
                    name: 'descricao',
                    value: conta.descricao,
                    placeholder: 'Descrição'
                }, 
                {
                    name: 'valor',
                    value: conta.valor,
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }, 
                {
                    text: 'Enviar',
                    handler: (data) => {
                        const obj = {...conta, ...data};
                        this.conta.edita(obj);
                    }
                }
            ]
        });

        confirm.present();
    }
}
