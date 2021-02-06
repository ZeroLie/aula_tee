import { Component, OnInit } from '@angular/core';
import { ContaService } from '../contas/service/conta-service';
import { LoginService } from './../auth/service/login.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    mes =  new Date().toISOString();

    conta = {
        pagar: {num: 0, valor: 0},
        receber: {num: 0, valor: 0}, 
        saldo: {num: 0, valor: 0}
    };

    constructor(
        private contas: ContaService,
        private service: LoginService
    ) { }

    ionViewWillEnter() {
        this.atualizaContas();    
    }

    atualizaContas() {
        this.contas.total('pagar', this.mes).subscribe(
            (x: any) => {
                this.conta.pagar = x;

                this.contas.total('receber', this.mes).subscribe(
                    (y: any) => {
                        this.conta.receber = y;
                        this.atualizarSaldo(); 
                    }
                ); 
            }
        );                 
    }

    atualizarSaldo() {
        this.conta.saldo.num = this.conta.pagar.num + this.conta.receber.num;
        this.conta.saldo.valor = this.conta.pagar.valor - this.conta.pagar.valor;
    }

    logout() {
        this.service.logout();
    }
}
