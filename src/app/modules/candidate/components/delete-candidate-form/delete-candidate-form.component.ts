import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Candidate } from '../../models/candidate';



@Component({
  selector: 'app-delete-candidate-form',
  templateUrl: './delete-candidate-form.component.html',
  styleUrls: ['./delete-candidate-form.component.scss']
})
export class DeleteCandidateFormComponent implements OnInit {
constructor(public dialogRef: MatDialogRef<DeleteCandidateFormComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Candidate) {
}
  ngOnInit() {
  }
}
