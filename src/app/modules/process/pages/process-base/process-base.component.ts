import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material';

import {CreateProcessFormComponent} from '../../components/create-process-form/create-process-form.component';


@Component({
  selector: 'app-process-base',
  templateUrl: './process-base.component.html',
  styleUrls: ['./process-base.component.scss']
})
export class ProcessBaseComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }
  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProcessFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
