import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PickerController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Network } from '@ngx-pwa/offline';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: [],
})
export class AdminPage implements OnInit {
  @Input() uid: string;
  todos = [];
  online= true;
  constructor(
    private auth: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toasCtrl: ToastController,
    private network: Network,
    private pickerCtrl: PickerController,
  ) {
    this.auth.getAllTodo().subscribe((res) => {
      this.todos = res
    }
    );
  }

  ngOnInit(): void {
  }

  async onLogout() {
    try {
      this.auth.logout();
      this.redirectuser();
      console.log('logout');
    } catch (error) {
      console.log(error);
    }
  }

  async openTodo(todos) {
    const modal = await this.modalCtrl.create({
      component: HomePage,
      componentProps: { id: todos.id },

    });

    modal.present();
  }

  async addTodo(text) {
    const alert = await this.alertCtrl
      .create({
        header: 'Add Todo',
        inputs: [
          {
            name: 'title',
            placeholder: 'Name',
            type: 'text',
          },
          {
            name: 'text',
            placeholder: 'Enter Your Todo',
            type: 'textarea',
          },
          {
            name: 'time',
            placeholder: 'Name',
            type: 'date',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancel',
          },
          {
            text: 'Add',
            handler: async (res) => {
              if (res.title == '' || res.text == '') {
                const toast = await this.toasCtrl.create({
                  message: 'Please Add name and note',
                  duration: 1000,
                });
                toast.present();
              } else {
                this.auth.addTodo({
                  title: res.title,
                  text: res.text,
                  time: res.time,
                });
                const toast = await this.toasCtrl.create({
                  message: 'Add Todo',
                  duration: 1000,
                });
                toast.present();
              }
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  async pickerCtrlPop(){
  const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'languages',
          options: [
            {
              text: 'JavaScript',
              value: 'javascript',
            },
            {
              text: 'TypeScript',
              value: 'typescript',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            window.alert(`You selected: ${value.languages.value}`);
          },
        },
      ],
    });
    await picker.present();
  }

  redirectuser() {
    this.router.navigate(['login']);
  }
}
