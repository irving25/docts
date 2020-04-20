import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import {CreateCandidateFormComponent} from "../../components/create-candidate-form/create-candidate-form.component";

@Component({
  selector: 'app-candidate-base',
  templateUrl: './candidate-base.component.html',
  styleUrls: ['./candidate-base.component.scss']
})
export class CandidateBaseComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(CreateCandidateFormComponent, {
      width: 'auto',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
