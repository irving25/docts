import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Group } from './../../models/group';

@Component({
  selector: 'app-delete-group-form',
  templateUrl: './delete-group-form.component.html',
  styleUrls: ['./delete-group-form.component.scss']
})
export class DeleteGroupFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteGroupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Group) {
}

  ngOnInit() {
  }

}
