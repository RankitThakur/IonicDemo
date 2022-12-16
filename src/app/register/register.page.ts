import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  

  constructor(private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {}
  async register(email, password) {
    try {
      const user = await this.auth.register(email.value, password.value);
      if (user) {
        console.log('user', user);
      }
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: `${error}`,
        duration: 1000,
      });
      return toast.present();
    }
  }

  public userProfileForm = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  });


}
