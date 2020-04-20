import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, Input, TemplateRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { DeleteDepartmentFormComponent } from '../delete-department-form/delete-department-form.component';
import { EditDepartmentFormComponent } from '../edit-department-form/edit-department-form.component';
import { Department } from './../../models/department';
import { FirebaseDepartmentServiceService } from '../../service/firebase-department-service.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DepartmentListComponent implements AfterViewInit {
  columns = [
    {columnDef: 'name', header: 'nombre', cell: (row: Department) => `${row.name}`},
    {columnDef: 'description', header: 'descripcion', cell: (row: Department) => `${row.description}`},
  ];
  departmentDataSource: MatTableDataSource<Department>;
  departmentColumnsToDisplay = this.columns.map(x => x.columnDef);
  expandedDepartmentElement: Department | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  resultsLength = 0;
  isLoading = true;

  constructor(private firebaseDepartment: FirebaseDepartmentServiceService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
  }
  ngAfterViewInit() {
    this.departmentDataSource = new MatTableDataSource();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.departmentDataSource.sort = this.sort;
    this.departmentDataSource.paginator = this.paginator;
    this.loadData();
  }


  applyFilter(filterValue: string) {
    this.departmentDataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData() {
    this.firebaseDepartment
      .getDepartmentsRef()
      .subscribe((departmentsList: Department[]) => {
          this.isLoading = false;
          this.departmentDataSource.data = departmentsList;
        },
        error => {
          this.isLoading = false;
          alert('[X] error al obtener las vacantes: ' + error);
        }
      );
    this.changeDetectorRefs.detectChanges();
  }
  /*
   refresh() {
    this.firebaseDepartment
      .getObservableDepartment()
      .subscribe((departmentList: Department[]) => {
          this.isLoading = false;
          this.departmentDataSource.data = departmentList;
        },
        error => this.isLoading = false);
    this.changeDetectorRefs.detectChanges();
  }
  */


  editDepartment(department: Department): void {
    console.log('edited: ', department);
    const dialogRef = this.dialog.open(EditDepartmentFormComponent, {
      width: '90%',
      data: department
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(' editado : ', department);
          this.firebaseDepartment.editDepartment(department);
        }
      });
  }

  deleteDepartment(department: Department): void {
    const dialogRef = this.dialog.open(DeleteDepartmentFormComponent, {
      width: '4000px',
      data: department
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.firebaseDepartment
            .deleteDepartment(department.key);
        }
      });
  }


}
