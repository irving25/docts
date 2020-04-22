import { 
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {DeleteCandidateFormComponent} from '../delete-candidate-form/delete-candidate-form.component';
import {EditCandidateFormComponent} from '../edit-candidate-form/edit-candidate-form.component';
import {Candidate} from '../../models/candidate';
import {FirebaseCandidateServiceService} from '../../service/firebase-candidate-service.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CandidateListComponent implements AfterViewInit {
  @Input() childTemplate: TemplateRef<any>;
  columns = [
    {columnDef: 'nombres', header: 'nombres', cell: (row: Candidate) => `${row.nombres}`},
    {columnDef: 'apellidoP', header: 'apellido paterno', cell: (row: Candidate) => `${row.apellidoP}`},
    {columnDef: 'apellidoM', header: 'apellido materno', cell: (row: Candidate) => `${row.apellidoM}%`},
    //{columnDef: 'estadoC', header: 'estado civil', cell: (row: Candidate) => `${row.estadoC}%`},
    //{columnDef: 'rfc', header: 'rfc', cell: (row: Candidate) => `${row.rfc}%`},
    //{columnDef: 'nss', header: 'numero de seguro social', cell: (row: Candidate) => `${row.nss}%`},
    //{columnDef: 'telefonoP', header: 'telefono principal', cell: (row: Candidate) => `${row.telefonoP}%`},
    {columnDef: 'telefonoS', header: 'telefono secundario', cell: (row: Candidate) => `${row.telefonoS}%`},
    {columnDef: 'email', header: 'email', cell: (row: Candidate) => `${row.email}%`},
    //{columnDef: 'gradoE', header: 'grado estudios', cell: (row: Candidate) => `${row.gradoE}%`},
    //{columnDef: 'titulado', header: 'titulado', cell: (row: Candidate) => `${row.titulado}%`},
    //{columnDef: 'fecha_egreso', header: 'fecha_egreso', cell: (row: Candidate) => `${row.fecha_egreso}%`},
  ];
  candidateDataSource: MatTableDataSource<Candidate>;
  candidateColumnsToDisplay = this.columns.map(x => x.columnDef);
  expandedCandidateElement: Candidate | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  resultsLength = 0;
  isLoading = true;

  /**
   * Metodo constructor
   * @param firebaseCandidate //c
   * @param changeDetectorRefs
   * A change-detection tree collects all views that are to be checked for changes.
   * @param dialog Objeto para arrojar un dialogo de notificacion.
   */
  constructor(private firebaseCandidate: FirebaseCandidateServiceService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) { }

              ngAfterViewInit() {
                this.candidateDataSource = new MatTableDataSource();
                this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
                this.candidateDataSource.sort = this.sort;
                this.candidateDataSource.paginator = this.paginator;
                this.loadData();
              }

  /**
   * @param filterValue - valor tecleado en el componente, el valor es filtrado dentro de los valores de
   */
  applyFilter(filterValue: string) {
    this.candidateDataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData() {
    this.firebaseCandidate
      .getCandidatesRef()
      .subscribe((candidatesList: Candidate[]) => {
          this.isLoading = false;
          this.candidateDataSource.data = candidatesList;
        },
        error => {
          this.isLoading = false;
          alert('[X] error al obtener los candidatos: ' + error);
        }
      );
    // actualiza el componente.
    this.changeDetectorRefs.detectChanges();
  }
  editCandidate(candidate: Candidate): void {
    console.log('edited: ', candidate);
    const dialogRef = this.dialog.open(EditCandidateFormComponent, {
      width: '90%',
      data: candidate
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(' editado : ', candidate);
          this.firebaseCandidate.editCandidate(candidate);
        }
      });
  }

  deleteCandidate(candidate: Candidate): void {
    const dialogRef = this.dialog.open(DeleteCandidateFormComponent, {
      width: '4000px',
      data: candidate
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.firebaseCandidate
            .deleteCandidate(candidate.key);
        }
      });
  }

}
