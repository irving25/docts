import { Component, Inject, OnInit  } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Recruiter } from '../../models/recruiter';

@Component({
  selector: 'app-delete-recruiter-form',
  templateUrl: './delete-recruiter-form.component.html',
  styleUrls: ['./delete-recruiter-form.component.scss']
})
export class DeleteRecruiterFormComponent implements OnInit {
constructor(public dialogRef: MatDialogRef<DeleteRecruiterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recruiter) {
}
  ngOnInit() {
  }
}
