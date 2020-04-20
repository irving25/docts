import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {MatChipInputEvent} from '@angular/material/chips';

import * as uuid from 'uuid';

import { Recruiter } from '../../models/recruiter';
import {RecruiterLevel} from '../../models/recruiter-level.enum';
import {FirebaseRecruiterServiceService} from '../../service/firebase-recruiter-service.service';


export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-create-recruiter-form',
  templateUrl: './create-recruiter-form.component.html',
  styleUrls: ['./create-recruiter-form.component.scss']
})
export class CreateRecruiterFormComponent implements OnInit {
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
  validationMessages = {
    namel: {
      required: 'nombre requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    lastname: {
      required: 'departamento requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    nationality: {
      required: 'grupo requerido'
    },
    age: {
      required: 'nivel de vacante requiredo.',
      minlength: 'Nivel de vacante debe tener por lo menos 8 caracteres.',
      maxlength: 'Nivel de vacante no puede tener más de 15 caracteres',
    },
    gender: {
      required: 'cantidad de vacante requiredo.',
    },
    birth_date: {
      required: 'cantidad de vacante requiredo.',
    },
    rfc: {
      required: 'cantidad de vacante requiredo.',
    },
    ssc: {
      required: 'cantidad de vacante requiredo.',
    },
    start_date_labor: {
      required: 'cantidad de vacante requiredo.',
    },
    end_date_labor: {
      required: 'cantidad de vacante requiredo.',
    },
    active: {
      required: 'cantidad de vacante requiredo.',
    },
    intern: {
      required: 'cantidad de vacante requiredo.',
    },
    phone: {
      required: 'cantidad de vacante requiredo.',
    },
    cellphone: {
      required: 'cantidad de vacante requiredo.',
    }
  };

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private recruiterService: FirebaseRecruiterServiceService) {
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
gender:['', [Validators.required]],
birth_date: ['', [Validators.required]],
rfc: ['', [Validators.required]],
ssc:['', [Validators.required]],
start_date_labor: ['', [Validators.required]],
end_date_labor: ['', [Validators.required]],
active:['', [Validators.required]],
intern:['', [Validators.required]],
phone:['', [Validators.required]],
cellphone:['', [Validators.required]],
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

  // envio de formulario
  onSubmit(recruiterData) {
    console.log(recruiterData);
    this.recruiterService
      .createRecruiter(new Recruiter(
        uuid.v4(),
        recruiterData.namel,
        recruiterData.lastname,
        recruiterData.nationality,
        recruiterData.age,
        recruiterData.gender,
        recruiterData.birth_date,
        recruiterData.rfc,
        recruiterData.ssc,
        recruiterData.start_date_labor,
        recruiterData.end_date_labor,
        recruiterData.active,
        recruiterData.intern,
        recruiterData.phone,
        recruiterData.cellphone
))
      .then(() => {
        this.snackBar.open('reclutador creado');
      })
      .catch(error => {
          this.snackBar.open(error, '[X]', {
            announcementMessage: 'notification',
            direction: 'ltr',
            duration: 5500,
          });
        }
      );
    this.recruiterForm.reset();
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
