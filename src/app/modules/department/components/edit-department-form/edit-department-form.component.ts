import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {Fruit1} from '../create-department-form/create-department-form.component';
import {Department} from '../../models/department';
import {DepartmentLevel} from '../../models/department-level.enum';
import { FirebaseDepartmentServiceService } from './../../service/firebase-department-service.service';

@Component({
  selector: 'app-edit-department-form',
  templateUrl: './edit-department-form.component.html',
  styleUrls: ['./edit-department-form.component.scss']
})
export class EditDepartmentFormComponent implements OnInit {

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
  //  group: '',
  //  quantityAvailable: '',
  //  level: ''
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
      required: 'descripcion requerida',
      minlength: 'La descripcion debe tener por lo menos 8 caracteres.',
      maxlength: 'La descripcion no puede tener más de 15 caracteres',
    }
  };

  constructor(public dialogRef: MatDialogRef<EditDepartmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department,
              private fb: FormBuilder,
              private firebaseDepartmentServiceService: FirebaseDepartmentServiceService) {
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
      description: ['', [Validators.minLength(4), Validators.maxLength(50)]],
     // level: [''],
    //  group: [''],
// quantityAvailable: ['']
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

  cancel() {
    this.dialogRef.close();
    this.departmentForm.reset();
  }

  editDepartment() {
    this.data.name = this.departmentForm.get('name').value;
    this.data.description = this.departmentForm.get('description').value;
    this.firebaseDepartmentServiceService.editDepartment(this.data);
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

