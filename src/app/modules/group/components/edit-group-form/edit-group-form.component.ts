import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {Fruit2} from '../create-group-form/create-group-form.component';
import {Group} from '../../models/group';
import {GroupLevel} from '../../models/group-level.enum';
import { FirebaseGroupServiceService } from './../../service/firebase-group-service.service';

@Component({
  selector: 'app-edit-group-form',
  templateUrl: './edit-group-form.component.html',
  styleUrls: ['./edit-group-form.component.scss']
})
export class EditGroupFormComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit2[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  groupForm: FormGroup; // formulario de login
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

  constructor(public dialogRef: MatDialogRef<EditGroupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Group,
              private fb: FormBuilder,
              private firebaseGroupServiceService: FirebaseGroupServiceService) {
    this.levels = Object.keys(GroupLevel)
      .map(key => GroupLevel[key]);
    console.log(this.levels);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void { // se contruye el formulario
    this.groupForm = this.fb.group({
      fontSize: [16, Validators.min(10)],
      name: ['', [Validators.required]],
      description: ['', [Validators.minLength(4), Validators.maxLength(50)]],
     // level: [''],
    //  group: [''],
// quantityAvailable: ['']
    });
    this.groupForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.groupForm) {
      return;
    }
    const form = this.groupForm;
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
    this.groupForm.reset();
  }

  editGroup() {
    this.data.name = this.groupForm.get('name').value;
    this.data.description = this.groupForm.get('description').value;
    this.firebaseGroupServiceService.editGroup(this.data);
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

  remove(fruit: Fruit2): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}

