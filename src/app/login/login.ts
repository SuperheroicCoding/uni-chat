import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignupPage} from '../signup/signup';
import {ResetPasswordPage} from '../reset-password/reset-password';
import {EmailValidator} from '../shared/email.validator';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  public loading: any;

  constructor(public nav: NavController, public authService: AuthService,
              public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
        Validators.required])]
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authService.loginUser(this.loginForm.value.email,
            this.loginForm.value.password)
            .catch(error => {
              console.error("Error while login User", error);
              return this.loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                  message: error.message,
                  buttons: [{text: "Ok", role: 'cancel'}]
                });
                return alert.present();
              });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToResetPassword() {
    this.nav.push(ResetPasswordPage);
  }

  createAccount() {
    this.nav.push(SignupPage);
  }

}
