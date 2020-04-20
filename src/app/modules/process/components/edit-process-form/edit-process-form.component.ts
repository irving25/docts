import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { FirebaseRecruiterServiceService } from 'src/app/modules/recruiter/service/firebase-recruiter-service.service';
import { FirebaseCandidateServiceService } from 'src/app/modules/candidate/service/firebase-candidate-service.service';

import {Process} from '../../models/process';
import {ProcessLevel} from '../../models/process-level.enum';
import { FirebaseProcessServiceService } from '../../service/service/firebase-process-service.service';
import { Candidate } from './../../../candidate/models/candidate';
import { Recruiter } from './../../../recruiter/models/recruiter';

@Component({
  selector: 'app-edit-process-form',
  templateUrl: './edit-process-form.component.html',
  styleUrls: ['./edit-process-form.component.scss']
})
export class EditProcessFormComponent implements OnInit {
 
  recruiters: Recruiter [] = [

  ];

  candidates: Candidate [] = [

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

  constructor(public dialogRef: MatDialogRef<EditProcessFormComponent>,
              @Inject(MAT_DIALOG_DATA) public processEdit: Process,
              private fb: FormBuilder,
              private processService: FirebaseProcessServiceService,
              private recruiterService: FirebaseRecruiterServiceService,
              private candidateService: FirebaseCandidateServiceService) {
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
  estatus_general: ['', [Validators.required]],
  id_reclutador: ['', [Validators.required]],
  id_candidato:['', [Validators.required]],
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

cancel() {
this.dialogRef.close();
this.processForm.reset();
}

editProcess() {
this.processEdit.fecha_creacion = this.processForm.get('fecha_creacion').value;
this.processEdit.fecha_modificacion = this.processForm.get('fecha_modificacion').value;
this.processEdit.estatus_general = this.processForm.get('estatus_general').value;
this.processEdit.actividad_actual = this.processForm.get('actividad_actual').value;
this.processEdit.id_reclutador = this.processForm.get('id_reclutador').value;
this.processEdit.id_candidato = this.processForm.get('id_candidato').value;
this.processEdit.id_examen = this.processForm.get('id_examen').value;
this.processEdit.lista_actividades = this.processForm.get('lista_actividades').value;
this.processService.editProcess(this.processEdit);
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

