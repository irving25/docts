import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {Candidate} from '../../models/candidate';
import {CandidateLevel} from '../../models/candidate-level.enum';
import { FirebaseCandidateServiceService } from './../../service/firebase-candidate-service.service';

@Component({
  selector: 'app-edit-candidate-form',
  templateUrl: './edit-candidate-form.component.html',
  styleUrls: ['./edit-candidate-form.component.scss']
})
export class EditCandidateFormComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  candidateForm: FormGroup;
  formErrors = {
      nombres: '',
      apellidoP: '',
      apellidoM: '',
      estadoC: '',
      rfc: '',
      nss: '',
      telefonoP: '',
      telefonoS: '',
      email: '',
      gradoE: '',
      titulado: '',
      fecha_egreso: ''
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
      telefonoS: {
        required: 'cantidad de vacante requiredo.',
      },
      email: {
        required: 'cantidad de vacante requiredo.',
      },
      gradoE: {
        required: 'cantidad de vacante requiredo.',
      },
      titulado: {
        required: 'cantidad de vacante requiredo.',
      },
      fecha_egreso: {
        required: 'cantidad de vacante requiredo.',
      }
    };

  constructor(public dialogRef: MatDialogRef<EditCandidateFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Candidate,
              private fb: FormBuilder,
              private firebaseCandidateServiceService: FirebaseCandidateServiceService) {
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
      estadoC: ['', [Validators.required]],
      rfc:['', [Validators.required]],
      nss: ['', [Validators.required]],
      telefonoP: ['', [Validators.required]],
      telefonoS:['', [Validators.required]],
      email: ['', [Validators.required]],
      gradoE: ['', [Validators.required]],
      titulado:['', [Validators.required]],
      fecha_egreso:['', [Validators.required]],
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
  cancel() {
    this.dialogRef.close();
    this.candidateForm.reset();
  }
  editCandidate() {
    this.data.nombres = this.candidateForm.get('nombres').value;
    this.data.apellidoP = this.candidateForm.get('apellidoP').value;
    this.data.apellidoM = this.candidateForm.get('apellidoM').value;
    //this.data.estadoC = this.candidateForm.get('estadoC').value;
    //this.data.rfc = this.candidateForm.get('rfc').value;
    //this.data.nss = this.candidateForm.get('nss').value;
    //this.data.telefonoP = this.candidateForm.get('telefonoP').value;
    this.data.telefonoS = this.candidateForm.get('telefonoS').value;
    this.data.email = this.candidateForm.get('email').value;
    //this.data.gradoE = this.candidateForm.get('gradoE').value;
    //this.data.titulado = this.candidateForm.get('titulado').value;
   // this.data.fecha_egreso = this.candidateForm.get('fecha_egreso').value;
    this.firebaseCandidateServiceService.editCandidate(this.data);
      }
}
