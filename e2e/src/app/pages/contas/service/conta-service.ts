import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContaService {
    collection: AngularFirestoreCollection;

    constructor(
        private db: AngularFirestore
    ) { }

    registraConta(conta) {
        conta.id = this.db.createId();
        this.collection = this.db.collection('conta');
        return this.collection.doc(conta.id).set(conta);
    }

    lista(tipo) {
        this.collection = this.db.collection('conta', ref => ref.where('tipo', '==', tipo));
        return this.collection.valueChanges();
    }

    remove(conta) {
        this.collection = this.db.collection('conta');
        this.collection.doc(conta.id).delete();
    }

    edita(conta) {
        this.collection = this.db.collection('conta');
        this.collection.doc(conta.id).update(conta);
    }

    /**
     * Totaliza as contas de acordo com seu tipo
     * @param tipo: string - modalidade de contas 
     */
    total(tipo, mes) {

        console.log(mes);

        this.collection = this.db.collection('conta', ref => ref.where('tipo', '==', tipo));
        return this.collection.get().pipe(map(snap => {
            let cont = 0;
            let sum = 0;

            snap.docs.map( doc => {
                const conta = doc.data();
                const valor = parseFloat(conta.valor);
                sum += valor;
                cont++;
            });

            return { num: cont, valor: sum }; 
        }));        
    }

}
