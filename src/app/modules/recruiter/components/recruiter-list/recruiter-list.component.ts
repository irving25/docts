import { AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {DeleteRecruiterFormComponent} from '../delete-recruiter-form/delete-recruiter-form.component';
import {EditRecruiterFormComponent} from '../edit-recruiter-form/edit-recruiter-form.component';
import {Recruiter} from '../../models/recruiter';
import {FirebaseRecruiterServiceService} from '../../service/firebase-recruiter-service.service';


@Component({
  selector: 'app-recruiter-list',
  templateUrl: './recruiter-list.component.html',
  styleUrls: ['./recruiter-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecruiterListComponent implements AfterViewInit {
   @Input() childTemplate: TemplateRef<any>;
    columns = [
    {columnDef: 'namel', header: 'nombre', cell: (row: Recruiter) => `${row.namel}`},
    {columnDef: 'lastname', header: 'apellido', cell: (row: Recruiter) => `${row.lastname}`},
    {columnDef: 'nationality', header: 'nacionalidad', cell: (row: Recruiter) => `${row.nationality}%`},
    {columnDef: 'age', header: 'edad', cell: (row: Recruiter) => `${row.age}%`},
    {columnDef: 'gender', header: 'genero', cell: (row: Recruiter) => `${row.gender}%`},
    {columnDef: 'birth_date', header: 'Fecha de nacimiento', cell: (row: Recruiter) => `${row.birth_date}%`},
    {columnDef: 'rfc', header: 'rfc', cell: (row: Recruiter) => `${row.rfc}%`},
    {columnDef: 'ssc', header: 'numero de seguro social', cell: (row: Recruiter) => `${row.ssc}%`},
    {columnDef: 'start_date_labor', header: 'Dia de inicio', cell: (row: Recruiter) => `${row.start_date_labor}%`},
    {columnDef: 'end_date_labor', header: 'Ultimo dia', cell: (row: Recruiter) => `${row.end_date_labor}%`},
    {columnDef: 'active', header: 'activo', cell: (row: Recruiter) => `${row.active}%`},
    {columnDef: 'intern', header: 'interno', cell: (row: Recruiter) => `${row.intern}%`},
    {columnDef: 'phone', header: 'numero', cell: (row: Recruiter) => `${row.phone}%`},
    {columnDef: 'cell_phone', header: 'celular', cell: (row: Recruiter) => `${row.cellphone}%`},

  ];

  recruiterDataSource: MatTableDataSource<Recruiter>;
  recruiterColumnsToDisplay = this.columns.map(x => x.columnDef);
  expandedRecruiterElement: Recruiter | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  resultsLength = 0;
  isLoading = true;

  /**
   * Metodo constructor
   * @param firebaseRecruiter //c
   * @param changeDetectorRefs
   * A change-detection tree collects all views that are to be checked for changes.
   * @param dialog Objeto para arrojar un dialogo de notificacion.
   */
  constructor(private firebaseRecruiter: FirebaseRecruiterServiceService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.recruiterDataSource = new MatTableDataSource();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.recruiterDataSource.sort = this.sort;
    this.recruiterDataSource.paginator = this.paginator;
    this.loadData();
  }

  /**
   * @param filterValue - valor tecleado en el componente, el valor es filtrado dentro de los valores de
   */
  applyFilter(filterValue: string) {
    this.recruiterDataSource.filter = filterValue.trim().toLowerCase();
  }


  loadData() {
    this.firebaseRecruiter
      .getRecruitersRef()
      .subscribe((recruitersList: Recruiter[]) => {
          this.isLoading = false;
          this.recruiterDataSource.data = recruitersList;
        },
        error => {
          this.isLoading = false;
          alert('[X] error al obtener los reclutadores: ' + error);
        }
      );
    // actualiza el componente.
    this.changeDetectorRefs.detectChanges();
  }

  editRecruiter(recruiter: Recruiter): void {
    console.log('edited: ', recruiter);
    const dialogRef = this.dialog.open(EditRecruiterFormComponent, {
      width: '90%',
      data: recruiter
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(' editado : ', recruiter);
          this.firebaseRecruiter.editRecruiter(recruiter);
        }
      });
  }

  deleteRecruiter(recruiter: Recruiter): void {
    const dialogRef = this.dialog.open(DeleteRecruiterFormComponent, {
      width: '4000px',
      data: recruiter
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.firebaseRecruiter
            .deleteRecruiter(recruiter.key);
        }
      });
  }


}
