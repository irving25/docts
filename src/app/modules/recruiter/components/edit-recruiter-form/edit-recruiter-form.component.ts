import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {Fruit} from '../create-recruiter-form/create-recruiter-form.component';
import {Recruiter} from '../../models/recruiter';
import {RecruiterLevel} from '../../models/recruiter-level.enum';
import { FirebaseRecruiterServiceService } from './../../service/firebase-recruiter-service.service';

@Component({
  selector: 'app-edit-recruiter-form',
  templateUrl: './edit-recruiter-form.component.html',
  styleUrls: ['./edit-recruiter-form.component.scss']
})
export class EditRecruiterFormComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];
  recruiterForm: FormGroup; // formulario de login
  // objeto de errores
  formErrors = {
    namel: '',
    lastname: '',
    nationality: '',
    age: '',
    gender: '',
    birth_date: '',
    rfc: '',
    ssc: '',
    start_date_labor: '',
    end_date_labor: '',
    active: '',
    intern: '',
    phone: '',
    cellphone: ''
  };
  levels: any;
  // mensajes de validacion
  validationMessages = {
    namel: {
      required: 'nombre requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    lastname: {
      required: 'descripcion requerida',
      minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
      maxlength: 'La descripcion no puede tener más de 15 caracteres',
    },
    nationality: {
      required: 'nombre requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    age: {
      required: 'descripcion requerida',
      minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
      maxlength: 'La descripcion no puede tener más de 15 caracteres',
    },
    gender: {
        required: 'nombre requerido',
        minlength: 'El Password debe tener por lo menos 8 caracteres.',
        maxlength: 'El Password no puede tener más de 15 caracteres',
      },
      birth_date: {
        required: 'descripcion requerida',
        minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
        maxlength: 'La descripcion no puede tener más de 15 caracteres',
      },
        rfc: {
          required: 'nombre requerido',
          minlength: 'El Password debe tener por lo menos 8 caracteres.',
          maxlength: 'El Password no puede tener más de 15 caracteres',
        },
        ssc: {
          required: 'descripcion requerida',
          minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
          maxlength: 'La descripcion no puede tener más de 15 caracteres',
        },
          start_date_labor: {
            required: 'nombre requerido',
            minlength: 'El Password debe tener por lo menos 8 caracteres.',
            maxlength: 'El Password no puede tener más de 15 caracteres',
          },
          end_date_labor: {
            required: 'descripcion requerida',
            minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
            maxlength: 'La descripcion no puede tener más de 15 caracteres',
          },
            active: {
              required: 'nombre requerido',
              minlength: 'El Password debe tener por lo menos 8 caracteres.',
              maxlength: 'El Password no puede tener más de 15 caracteres',
            },
            intern: {
              required: 'descripcion requerida',
              minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
              maxlength: 'La descripcion no puede tener más de 15 caracteres',
            },
              phone: {
                required: 'nombre requerido',
                minlength: 'El Password debe tener por lo menos 8 caracteres.',
                maxlength: 'El Password no puede tener más de 15 caracteres',
              },
              cellphone: {
                required: 'descripcion requerida',
                minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
                maxlength: 'La descripcion no puede tener más de 15 caracteres'
              }
  };
  constructor(public dialogRef: MatDialogRef<EditRecruiterFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Recruiter,
              private fb: FormBuilder,
              private firebaseRecruiterServiceService: FirebaseRecruiterServiceService) {
    this.levels = Object.keys(RecruiterLevel)
      .map(key => RecruiterLevel[key]);
    console.log(this.levels);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void { // se contruye el formulario
    this.recruiterForm = this.fb.group({
      fontSize: [16, Validators.min(10)],
      namel: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      // tslint:disable-next-line: variable-name
      birth_date: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      ssc: ['', [Validators.required]],
      start_date_labor: ['', [Validators.required]],
      end_date_labor: ['', [Validators.required]],
      active: ['', [Validators.required]],
      intern: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
    });
    this.recruiterForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.recruiterForm) {
      return;
    }
    const form = this.recruiterForm;
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
    this.recruiterForm.reset();
  }

  editRecruiter() {
    this.data.namel = this.recruiterForm.get('namel').value;
    this.data.lastname = this.recruiterForm.get('lastname').value;
    this.data.nationality = this.recruiterForm.get('nationality').value;
    this.data.age = this.recruiterForm.get('age').value;
    this.data.gender = this.recruiterForm.get('gender').value;
    this.data.birth_date = this.recruiterForm.get('birth_date').value;
    this.data.rfc = this.recruiterForm.get('rfc').value;
    this.data.ssc = this.recruiterForm.get('ssc').value;
    this.data.start_date_labor = this.recruiterForm.get('start_date_labor').value;
    this.data.end_date_labor = this.recruiterForm.get('end_date_labor').value;
    this.data.active = this.recruiterForm.get('active').value;
    this.data.intern = this.recruiterForm.get('intern').value;
    this.data.phone = this.recruiterForm.get('phone').value;
    this.data.cellphone = this.recruiterForm.get('cellphone').value;
    this.firebaseRecruiterServiceService.editRecruiter(this.data);
      }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}

