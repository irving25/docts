import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {MatChipInputEvent} from '@angular/material/chips';

import * as uuid from 'uuid';

import { Candidate } from '../../models/candidate';
import {CandidateLevel} from '../../models/candidate-level.enum';
import {FirebaseCandidateServiceService} from '../../service/firebase-candidate-service.service';
import {AuthService} from '../../../../shared/services/authentication/auth.service';

@Component({
  selector: 'app-create-candidate-form',
  templateUrl: './create-candidate-form.component.html',
  styleUrls: ['./create-candidate-form.component.scss']
})
export class CreateCandidateFormComponent implements OnInit {

candidateForm: FormGroup;
formErrors = {
    nombres: '',
    apellidoP: '',
    apellidoM: '',
   // estadoC: '',
    //rfc: '',
    //nss: '',
    //telefonoP: '',
    telefonoS: '',
    email: '',
    //gradoE: '',
    //titulado: '',
    //fecha_egreso: '',
    password: '',
    cedula: ''
  };
  levels: any;
  validationMessages = {
    nombres: {
      required: 'nombres requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    apellidoP: {
      required: 'apellido paterno requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    apellidoM: {
      required: 'apellido materno requerido'
    },
    /*
    estadoC: {
      required: 'estado civil requiredo.',
      minlength: 'Nivel de vacante debe tener por lo menos 8 caracteres.',
      maxlength: 'Nivel de vacante no puede tener más de 15 caracteres',
    },
    rfc: {
      required: 'cantidad de vacante requiredo.',
    },
    nss: {
      required: 'cantidad de vacante requiredo.',
    },
    telefonoP: {
      required: 'cantidad de vacante requiredo.',
    },
    */
    telefonoS: {
      required: 'cantidad de vacante requiredo.',
    },
    email: {
      required: 'cantidad de vacante requiredo.',
    },
    /*
    gradoE: {
      required: 'cantidad de vacante requiredo.',
    },
    titulado: {
      required: 'cantidad de vacante requiredo.',
    },
    fecha_egreso: {
      required: 'cantidad de vacante requiredo.',
    },
    */
    password:{
      required: 'password requerido'
    },
    cedula: {
      required: 'cedula requerida'
    }
  };
  
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private candidateService: FirebaseCandidateServiceService,
    private authService:AuthService) {
this.levels = Object.keys(CandidateLevel)
.map(key => CandidateLevel[key]);
console.log(this.levels);
}

ngOnInit() {
this.buildForm();
}

buildForm(): void { // se contruye el formulario
  this.candidateForm = this.fb.group({
    fontSize: [16, Validators.min(10)],
    nombres: ['', [Validators.required]],
    apellidoP: ['', [Validators.required]],
    apellidoM: ['', [Validators.required]],
    //estadoC: ['', [Validators.required]],
    //rfc:['', [Validators.required]],
    //nss: ['', [Validators.required]],
    //telefonoP: ['', [Validators.required]],
    telefonoS:['', [Validators.required]],
    email: ['', [Validators.required]],
    //gradoE: ['', [Validators.required]],
    //titulado:['', [Validators.required]],
    //fecha_egreso:['', [Validators.required]],
    password: ['', [Validators.required]],
    cedula: ['', [Validators.required]]
});
  this.candidateForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged(); // reset validation messages
}

onValueChanged(data?: any) {
  if (!this.candidateForm) {
    return;
  }
  const form = this.candidateForm;
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

onSubmit(candidateData) {
  console.log(candidateData);
  /*
  this.candidateService
    .createCandidate(new Candidate(
      uuid.v4(),
      candidateData.nombres,
      candidateData.apellidoP,
      candidateData.apellidoM,
      candidateData.estadoC,
      candidateData.rfc,
      candidateData.nss,
      candidateData.telefonoP,
     candidateData.telefonoS,
      candidateData.email,
      candidateData.gradoE,
      candidateData.titulado,
      candidateData.fecha_egreso
))
    .then(() => {
      this.snackBar.open('candidato creado');
    })
    .catch(error => {
        this.snackBar.open(error, '[X]', {
          announcementMessage: 'notification',
          direction: 'ltr',
          duration: 5500,
        });
      }
    );
    */
  this.authService.emailSignUp(candidateData.email, candidateData.password)
  .then(user=>{
    console.log("nuevo usuario");
    console.log(user.user.uid);
    this.candidateService.createCandidate(new Candidate(
      user.user.uid,
      candidateData.nombres,
      candidateData.apellidoP,
      candidateData.apellidoM,
      candidateData.telefonoS,
      candidateData.cedula,
      candidateData.password,
      candidateData.email,
      "doctor"
    )).then(newUser=>{
      console.log(newUser);

    })
    .catch(err=>{
      console.log(err);
    });
  })
  .catch(error => {
    console.log(error);
  });
  this.candidateForm.reset();
}

}
