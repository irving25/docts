import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import * as uuid from 'uuid';

import { FirebaseRecruiterServiceService } from 'src/app/modules/recruiter/service/firebase-recruiter-service.service';

import { Process } from '../../models/process';
import {ProcessLevel} from '../../models/process-level.enum';
import {FirebaseProcessServiceService} from '../../service/service/firebase-process-service.service';
import { Candidate } from './../../../candidate/models/candidate';
import { FirebaseCandidateServiceService } from './../../../candidate/service/firebase-candidate-service.service';
import { Recruiter } from './../../../recruiter/models/recruiter';


@Component({
  selector: 'app-create-process-form',
  templateUrl: './create-process-form.component.html',
  styleUrls: ['./create-process-form.component.scss']
})
export class CreateProcessFormComponent implements OnInit {

candidates: Candidate [] = [
];

recruiters: Recruiter [] = [

];

processForm: FormGroup;

formErrors = {
  fecha_creacion: '',
  fecha_modificacion: '',
  estatus_general: '',
  actividad_actual: '',
  id_reclutador: '',
  id_candidato: '',
  id_examen: '',
  lista_actividades: ''
};
levels: any;
validationMessages = {
  fecha_creacion: {
    required: 'nombre requerido',
    minlength: 'El Password debe tener por lo menos 8 caracteres.',
    maxlength: 'El Password no puede tener más de 15 caracteres',
  },
  fecha_modificacion: {
    required: 'departamento requerido',
    minlength: 'El Password debe tener por lo menos 8 caracteres.',
    maxlength: 'El Password no puede tener más de 15 caracteres',
  },
  estatus_general: {
    required: 'grupo requerido'
  },
  actividad_actual: {
    required: 'nivel de vacante requiredo.',
    minlength: 'Nivel de vacante debe tener por lo menos 8 caracteres.',
    maxlength: 'Nivel de vacante no puede tener más de 15 caracteres',
  },
  id_reclutador: {
    required: 'cantidad de vacante requiredo.',
  },
  id_candidato: {
    required: 'cantidad de vacante requiredo.',
  },
  id_examen: {
    required: 'cantidad de vacante requiredo.',
  },
  lista_actividades: {
    required: 'cantidad de vacante requiredo.',
  }
};

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private processService: FirebaseProcessServiceService,
              private candidateService: FirebaseCandidateServiceService,
              private recruiterService: FirebaseRecruiterServiceService) {
this.levels = Object.keys(ProcessLevel)
.map(key => ProcessLevel[key]);
console.log(this.levels);
}

ngOnInit() {
this.buildForm();
}

buildForm(): void { // se contruye el formulario
this.processForm = this.fb.group({
fontSize: [16, Validators.min(10)],
fecha_creacion: ['', [Validators.required]],
fecha_modificacion: ['', [Validators.required]],
actividad_actual: ['', [Validators.required]],
estatus_general: ['', [Validators.required]],
id_reclutador: [''],
id_candidato: [''],
id_examen: ['', [Validators.required]],
lista_actividades: ['', [Validators.required]],
});
this.processForm.valueChanges.subscribe(data => this.onValueChanged(data));
this.onValueChanged(); // reset validation messages
}

onValueChanged(data?: any) {
if (!this.processForm) {
return;
}
const form = this.processForm;
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
onSubmit(processData) {
console.log(processData);
this.processService
.createProcess(new Process(
uuid.v4(),
processData.fecha_creacion,
processData.fecha_modificacion,
processData.estatus_general,
processData.actividad_actual,
processData.id_reclutador,
processData.id_candidato,
processData.id_examen,
processData.lista_actividades
))
.then(() => {
this.snackBar.open('proceso creado');
})
.catch(error => {
this.snackBar.open(error, '[X]', {
  announcementMessage: 'notification',
  direction: 'ltr',
  duration: 5500,
});
}
);
this.processForm.reset();
}
loadDataCandidate() {
  this.candidateService
    .getCandidatesRef()
    .subscribe((candidatesList: Candidate[]) => {
      //  this.isLoading = false;
        this.candidates = candidatesList;
        console.log(candidatesList);
      },
      error => {
     //   this.isLoading = false;
        alert('[X] error al obtener las vacantes: ' + error);
      }
    );
//  this.changeDetectorRefs.detectChanges();
}
loadDataRecruiter() {
  this.recruiterService
    .getRecruitersRef()
    .subscribe((recruitersList: Recruiter[]) => {
      //  this.isLoading = false;
        this.recruiters = recruitersList;
        console.log(recruitersList);
      },
      error => {
     //   this.isLoading = false;
        alert('[X] error al obtener las vacantes: ' + error);
      }
    );
//  this.changeDetectorRefs.detectChanges();
}
ngAfterViewInit() {
  this.loadDataCandidate();
  this.loadDataRecruiter();
}



}
