import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Department } from '../../models/department';


@Component({
  selector: 'app-delete-department-form',
  templateUrl: './delete-department-form.component.html',
  styleUrls: ['./delete-department-form.component.scss']
})
export class DeleteDepartmentFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteDepartmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department) {
}
  ngOnInit() {
  }
}
