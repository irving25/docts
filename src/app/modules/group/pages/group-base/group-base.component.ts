import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { CreateGroupFormComponent } from './../../components/create-group-form/create-group-form.component';


@Component({
  selector: 'app-group-base',
  templateUrl: './group-base.component.html',
  styleUrls: ['./group-base.component.scss']
})
export class GroupBaseComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
