import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import {CreateRecruiterFormComponent} from "../../components/create-recruiter-form/create-recruiter-form.component";


@Component({
  selector: 'app-recruiter-base',
  templateUrl: './recruiter-base.component.html',
  styleUrls: ['./recruiter-base.component.scss']
})
export class RecruiterBaseComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }
  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRecruiterFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
