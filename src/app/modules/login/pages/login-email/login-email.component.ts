import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {CreateCandidateFormComponent} from "../../../candidate/components/create-candidate-form/create-candidate-form.component";
import {AuthService} from '../../../../shared/services/authentication/auth.service';


/**
 * Component para inicio de sesion.
 */
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  // var definition
  hidePassword = true; // bandera para ocultar el password en el formulario
  loginForm: FormGroup; // formulario de login
  user: any;
  // objeto de errores
  formErrors = {
    login: '',
    password: ''
  };
  // mensajes de validacion
  validationMessages = {
    login: {
      required: 'Email requerido',
      email: 'Correo invalido'
    },
    password: {
      required: 'Password requiredo.',
      pattern: 'El Password debe incluir una letra y un número.',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    }
  };

  // inyeccion del form builder
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void { // se contruye el formulario
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(15)]],
    });
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(field)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // envio de formulario
  onSubmit(customerData) {
    this.authService
      .emailLogin(customerData.login, customerData.password)
      .then((user) => {
        this.snackBar.open('bienvenido', user.additionalUserInfo.username, {
          duration: 1000,
        });
        this.router.navigateByUrl('/welcome/menu');
      })
      .catch((error) => {
        console.log('no sesion');
        this.snackBar.open(error, '[X]', {
          announcementMessage: 'notification',
          direction: 'ltr',
          duration: 5500,
        });
      });
    this.loginForm.reset();
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(CreateCandidateFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

