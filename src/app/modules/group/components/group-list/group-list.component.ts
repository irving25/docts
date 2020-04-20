import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, Input, TemplateRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { DeleteGroupFormComponent } from '../delete-group-form/delete-group-form.component';
import { EditGroupFormComponent } from '../edit-group-form/edit-group-form.component';
import { Group } from './../../models/group';
import { FirebaseGroupServiceService } from '../../service/firebase-group-service.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GroupListComponent implements AfterViewInit{
  columns = [
    {columnDef: 'name', header: 'nombre', cell: (row: Group) => `${row.name}`},
    {columnDef: 'description', header: 'descripcion', cell: (row: Group) => `${row.description}`},
  ];
  groupDataSource: MatTableDataSource<Group>;
  groupColumnsToDisplay = this.columns.map(x => x.columnDef);
  expandedGroupElement: Group | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  resultsLength = 0;
  isLoading = true;

  constructor(private firebaseGroup: FirebaseGroupServiceService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
  }
  ngAfterViewInit() {
    this.groupDataSource = new MatTableDataSource();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.groupDataSource.sort = this.sort;
    this.groupDataSource.paginator = this.paginator;
    this.loadData();
  }


  applyFilter(filterValue: string) {
    this.groupDataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData() {
    this.firebaseGroup
      .getGroupsRef()
      .subscribe((groupsList: Group[]) => {
          this.isLoading = false;
          this.groupDataSource.data = groupsList;
        },
        error => {
          this.isLoading = false;
          alert('[X] error al obtener los grupos: ' + error);
        }
      );
    this.changeDetectorRefs.detectChanges();
  }
  /*
  refresh() {
    this.firebaseGroup
      .getObservableGroup()
      .subscribe((groupList: Group[]) => {
          this.isLoading = false;
          this.groupDataSource.data = groupList;
        },
        error => this.isLoading = false);
    this.changeDetectorRefs.detectChanges();
  }
*/
  editGroup(group: Group): void {
    console.log('edited: ', group);
    const dialogRef = this.dialog.open(EditGroupFormComponent, {
      width: '90%',
      data: group
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(' editado : ', group);
          this.firebaseGroup.editGroup(group);
        }
      });
  }

  deleteGroup(group: Group): void {
    const dialogRef = this.dialog.open(DeleteGroupFormComponent, {
      width: '4000px',
      data: group
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.firebaseGroup
            .deleteGroup(group.key);
        }
      });
  }
}
