import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Department } from 'src/app/modules/department/models/department';

import { Fruit } from '../create-vacancy-form/create-vacancy-form.component';
import {VacancyLevel} from '../../models/vacancy-level.enum';
import {Vacancy} from '../../models/vacancy.model';
import {FirebaseVacancyServiceService} from '../../service/firebase-vacancy-service.service';
import { FirebaseDepartmentServiceService } from './../../../department/service/firebase-department-service.service';
import { Group } from './../../../group/models/group';
import { FirebaseGroupServiceService } from './../../../group/service/firebase-group-service.service';

export interface Fruit {
  name: string;
}
export interface SoftSkill{
name: string;
}
export interface HardSkill{
name: string;
}

@Component({
  selector: 'app-edit-vacancy-form',
  templateUrl: './edit-vacancy-form.component.html',
  styleUrls: ['./edit-vacancy-form.component.scss']
})
export class EditVacancyFormComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fruits: Fruit[] = [

  ];
  softSkills: SoftSkill[] = [

  ];
  hardSkills: HardSkill[] = [

  ];

  departments: Department [] = [

  ];
  groups: Group [] = [

  ];

  vacancyForm: FormGroup; // formulario de login
  // objeto de errores
  formErrors = {
    name: '',
    department: '',
    group: '',
    quantityAvailable: '',
    level: '',
    softSkill: '',
    hardSkill: '',
  };
  levels: any;
  // mensajes de validacion
  validationMessages = {
    name: {
      required: 'nombre requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    department: {
      required: 'departamento requerido',
      minlength: 'El Password debe tener por lo menos 8 caracteres.',
      maxlength: 'El Password no puede tener más de 15 caracteres',
    },
    group: {
      required: 'grupo requerido'
    },
    level: {
      required: 'nivel de vacante requiredo.',
      minlength: 'Nivel de vacante debe tener por lo menos 8 caracteres.',
      maxlength: 'Nivel de vacante no puede tener más de 15 caracteres',
    },
    quantityAvailable: {
      required: 'cantidad de vacante requiredo.',
    },
  };

  constructor(public dialogRef: MatDialogRef<EditVacancyFormComponent>,
              @Inject(MAT_DIALOG_DATA) public vacancyEdit: Vacancy,
              private fb: FormBuilder,
              private firebaseVacancyServiceService: FirebaseVacancyServiceService,
              private departmentService: FirebaseDepartmentServiceService,
              private groupService: FirebaseGroupServiceService) {
    this.levels = Object.keys(VacancyLevel)
      .map(key => VacancyLevel[key]);
    console.log(this.levels);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void { // se contruye el formulario
    this.vacancyForm = this.fb.group({
      fontSize: [16, Validators.min(10)],
      name: ['', [Validators.required]],
      department: ['', [Validators.minLength(4), Validators.maxLength(15)]],
      level: [''],
      group: [''],
      quantityAvailable: [''],
      softSkills: [''],
      hardSkills: [''],
    });
    this.vacancyForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.vacancyForm) {
      return;
    }
    const form = this.vacancyForm;
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
    this.vacancyForm.reset();
  }

  editVacancy() {
    this.vacancyEdit.name = this.vacancyForm.get('name').value;
    this.vacancyEdit.department = this.vacancyForm.get('department').value;
    this.vacancyEdit.group = this.vacancyForm.get('group').value;
    this.vacancyEdit.level = this.vacancyForm.get('level').value;
    this.vacancyEdit.quantityAvailable = this.vacancyForm.get('quantityAvailable').value;
    this.vacancyEdit.softSkill = this.vacancyForm.get('softSkill').value;
    this.vacancyEdit.hardSkill = this.vacancyForm.get('hardSkill').value;
    this.firebaseVacancyServiceService.editVacancy(this.vacancyEdit);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.softSkills.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(softSkill: SoftSkill): void {
    const index = this.softSkills.indexOf(softSkill);
    if (index >= 0) {
      this.softSkills.splice(index, 1);
    }
  }

  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.hardSkills.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove2(hardSkill: HardSkill): void {
    const index = this.hardSkills.indexOf(hardSkill);
    if (index >= 0) {
      this.hardSkills.splice(index, 1);
    }
  }

  loadDataDepartment() {
    this.departmentService
      .getDepartmentsRef()
      .subscribe((departmentsList: Department[]) => {
        //  this.isLoading = false;
          this.departments = departmentsList;
        },
        error => {
       //   this.isLoading = false;
          alert('[X] error al obtener las vacantes: ' + error);
        }
      );
  //  this.changeDetectorRefs.detectChanges();
  }
  loadDataGroup() {
    this.groupService
      .getGroupsRef()
      .subscribe((groupsList: Group[]) => {
        //  this.isLoading = false;
          this.groups = groupsList;
        },
        error => {
       //   this.isLoading = false;
          alert('[X] error al obtener las vacantes: ' + error);
        }
      );
  //  this.changeDetectorRefs.detectChanges();
  }
  ngAfterViewInit() {
    this.loadDataDepartment();
    this.loadDataGroup();
  }
}
