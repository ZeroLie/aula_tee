import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ContaService } from '../service/conta-service';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
    contasForm: FormGroup;

    constructor(
        private builder: FormBuilder,
        private conta: ContaService,
        private nav: NavController
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.contasForm = this.builder.group({
            tipo: ['', Validators.required],
            date: [new Date().toISOString(),Validators.required],
            valor: ['', [Validators.required, Validators.min(0.01)]],
            parceiro: ['', [Validators.required, Validators.minLength(5)]],
            descricao: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

  /**
  * Salva a nova conta no Firebase.
  */
  registraConta() {
      const conta = this.contasForm.value;
      this.conta.registraConta(conta).
      then(() => this.nav.navigateForward('contas/pagar'));
  }

}
