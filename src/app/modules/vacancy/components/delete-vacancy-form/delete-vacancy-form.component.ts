import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Vacancy} from '../../models/vacancy.model';

@Component({
  selector: 'app-delete-vacancy-form',
  templateUrl: './delete-vacancy-form.component.html',
  styleUrls: ['./delete-vacancy-form.component.scss']
})
export class DeleteVacancyFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteVacancyFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Vacancy) {
  }

  ngOnInit() {
  }
}
