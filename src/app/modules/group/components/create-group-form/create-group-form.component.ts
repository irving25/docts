import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import {Group} from './../../models/group';
import {GroupLevel} from './../../models/group-level.enum';
import {FirebaseGroupServiceService} from './../../service/firebase-group-service.service';

export interface Fruit2 {
  name: string;
}

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss']
})
export class CreateGroupFormComponent implements OnInit {

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
    id: '',
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
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    }
  };


  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private groupService: FirebaseGroupServiceService) {
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
      description: ['', [Validators.minLength(4), Validators.maxLength(400)]],
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

  onSubmit(groupData) {
    console.log(groupData);
    this.groupService
      .createGroup(new Group(
        groupData.id,
        groupData.name,
        groupData.description
      ))
      .then(() => {
        this.snackBar.open('Grupo creado');
      })
      .catch(error => {
          this.snackBar.open(error, '[X]', {
            announcementMessage: 'notification',
            direction: 'ltr',
            duration: 5500,
          });
        }
      );
    this.groupForm.reset();
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
