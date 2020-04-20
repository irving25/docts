import { Component, Inject, OnInit  } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Process } from '../../models/process';

@Component({
  selector: 'app-delete-process-form',
  templateUrl: './delete-process-form.component.html',
  styleUrls: ['./delete-process-form.component.scss']
})
export class DeleteProcessFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteProcessFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Process) {
}

  ngOnInit() {
  }

}
