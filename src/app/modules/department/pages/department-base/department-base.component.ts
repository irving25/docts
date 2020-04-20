import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import { CreateDepartmentFormComponent } from '../../components/create-department-form/create-department-form.component';


@Component({
  selector: 'app-department-base',
  templateUrl: './department-base.component.html',
  styleUrls: ['./department-base.component.scss']
})
export class DepartmentBaseComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDepartmentFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
