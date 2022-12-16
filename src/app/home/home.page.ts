import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService, Todo } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

 export class HomePage implements OnInit{
    @Input() id: string;
    todo: Todo;
  
    constructor(
      private auth: AuthService,
      private modalCtrl: ModalController,
      private toastCtrl: ToastController
    ) {  }
  
  
  ngOnInit(): void {
    this.auth.getTodoId(this.id).subscribe((res) => {
      this.todo = res;
    })
   }
  
    async updateTodo(todo) {
      this.auth.updateTodo(this.todo);
      const toast = await this.toastCtrl.create({
        message: `${todo.title} Todo Update`,
        duration: 1000,
      });
      toast.present();
      this.modalCtrl.dismiss();
    }
  
    async deleteTodo(todo) {
      this.auth.deleteTodo(this.todo);
      const toast = await this.toastCtrl.create({
        message: `${todo.title} Todo delete`,
        duration: 1000,
      });
      toast.present();
  
      this.modalCtrl.dismiss();
    }
  
    async dismis() {
      await this.modalCtrl.dismiss();
    }
  }
  