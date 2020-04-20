import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import * as uuid from 'uuid';

import { Department } from './../../models/department';
import { DepartmentLevel } from './../../models/department-level.enum';
import { FirebaseDepartmentServiceService } from './../../service/firebase-department-service.service';


export interface Fruit1 {
  name: string;
}

@Component({
  selector: 'app-create-department-form',
  templateUrl: './create-department-form.component.html',
  styleUrls: ['./create-department-form.component.scss']
})



export class CreateDepartmentFormComponent implements OnInit {


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit1[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];


  departmentForm: FormGroup; // formulario de login
  // objeto de errores
  formErrors = {
    name: '',
    description: ''
  };
  levels: any;

  // mensajes de validacion
  validationMessages = {
    name: {
      required: 'nombre requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    description: {
      required: 'departamento requerido',
      minlength: 'El contenido debe tener por lo menos 8 caracteres.',
      maxlength: 'El contenido no puede tener más de 400 caracteres',
    }
  };


  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private departmentService: FirebaseDepartmentServiceService) {
  this.levels = Object.keys(DepartmentLevel)
    .map(key => DepartmentLevel[key]);

  console.log(this.levels);

    }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void { // se contruye el formulario
    this.departmentForm = this.fb.group({
      fontSize: [16, Validators.min(10)],
      name: ['', [Validators.required]],
      description: ['', [Validators.minLength(4), Validators.maxLength(400)]],
    });
    this.departmentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  onValueChanged(data?: any) {
    if (!this.departmentForm) {
      return;
    }
    const form = this.departmentForm;
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

  onSubmit(departmentData) {
    console.log(departmentData);
    this.departmentService
      .createDepartment(new Department(
        uuid.v4(),
        departmentData.name,
        departmentData.description
      ))
      .then(() => {
        this.snackBar.open('Departamento creado');
      })
      .catch(error => {
          this.snackBar.open(error, '[X]', {
            announcementMessage: 'notification',
            direction: 'ltr',
            duration: 5500,
          });
        }
      );
    this.departmentForm.reset();
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

  remove(fruit: Fruit1): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


}
