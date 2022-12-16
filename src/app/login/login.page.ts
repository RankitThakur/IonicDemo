import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [],
})
export class LoginPage {
  uid: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async onLogin(email, password) {
    try {
      var user = await this.auth.login(email.value, password.value);
      this.uid = user.uid;
      console.log('user==>>>>', this.uid);
      if (user) {
        this.redirectuser();
      }
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Please Add name and note',
        duration: 1000,
      });
      toast.present();
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.auth.loginGoogle();
      if (user) {
        this.redirectuser();
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  redirectuser() {
    this.router.navigate(['admin']);
    console.log('email=====>>>>', this.uid);
  }
}
