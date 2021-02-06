import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLoggedIn: Observable<User>;

    constructor(
        private nav: NavController,
        private auth: AngularFireAuth,
        private toast: ToastController
    ) {
        this.isLoggedIn = this.auth.authState;
    }

    login(user) {
        this.auth.signInWithEmailAndPassword(user.email, user.password).
        then(() => this.nav.navigateForward('home')).
        catch (() => this.showError());
    }

    private async showError() {
        const ctrl = await this.toast.create({
            message: "Dados de acesso incorretos",
            duration: 3000
        });
        ctrl.present();
    }

    createUser(user) {
        this.auth.createUserWithEmailAndPassword(user.email, user.password).
        then(credentials => console.log(credentials));
    }
  
    recoverPass(data) {
        this.auth.sendPasswordResetEmail(data.email).
        then(() => this.nav.navigateBack('auth')).
        catch(err => {
            console.log(err);
        });
    }

    logout() {
        this.auth.signOut().
        then(() => this.nav.navigateBack('auth'));
    }
}
