import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateVacancyFormComponent} from "../../components/create-vacancy-form/create-vacancy-form.component";

@Component({
  selector: 'app-vacancy-base',
  templateUrl: './vacancy-base.component.html',
  styleUrls: ['./vacancy-base.component.scss']
})
export class VacancyBaseComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateVacancyFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
