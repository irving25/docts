import { AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {DeleteProcessFormComponent} from '../delete-process-form/delete-process-form.component';
import {EditProcessFormComponent} from '../edit-process-form/edit-process-form.component';
import {Process} from '../../models/process';
import {FirebaseProcessServiceService} from '../../service/service/firebase-process-service.service';
import { FirebaseCandidateServiceService } from '../../../candidate/service/firebase-candidate-service.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProcessListComponent implements AfterViewInit {
  @Input() childTemplate: TemplateRef<any>;
  columns = [
  {columnDef: 'fecha_creacion', header: 'Fecha de creacion', cell: (row: Process) => `${row.fecha_creacion}`},
  {columnDef: 'fecha_modificacion', header: 'Fecha de modificacion', cell: (row: Process) => `${row.fecha_modificacion}`},
  {columnDef: 'estatus_general', header: 'Estatus general', cell: (row: Process) => `${row.estatus_general}%`},
  {columnDef: 'actividad_actual', header: 'Actividad actual', cell: (row: Process) => `${row.actividad_actual}%`},
  {columnDef: 'id_reclutador', header: 'Reclutador', cell: (row: Process) => `${row.id_reclutador}%`},
  {columnDef: 'id_candidato', header: 'Candidato', cell: (row: Process) => `${row.id_candidato}%`},
  {columnDef: 'id_examen', header: 'Examen', cell: (row: Process) => `${row.id_examen}%`},
  {columnDef: 'lista_actividades', header: 'Lista de actividades', cell: (row: Process) => `${row.lista_actividades}%`}
];

processDataSource: MatTableDataSource<Process>;
processColumnsToDisplay = this.columns.map(x => x.columnDef);
expandedProcessElement: Process | null;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
resultsLength = 0;
isLoading = true;

/**
 * Metodo constructor
 * @param firebaseProcess //c
 * @param changeDetectorRefs
 * A change-detection tree collects all views that are to be checked for changes.
 * @param dialog Objeto para arrojar un dialogo de notificacion.
 */
constructor(private firebaseProcess: FirebaseProcessServiceService,
            private changeDetectorRefs: ChangeDetectorRef,
            public dialog: MatDialog,
            private candidateService: FirebaseCandidateServiceService) {
}

ngAfterViewInit() {
  this.processDataSource = new MatTableDataSource();
  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  this.processDataSource.sort = this.sort;
  this.processDataSource.paginator = this.paginator;
  this.loadData();
}

/**
 * @param filterValue - valor tecleado en el componente, el valor es filtrado dentro de los valores de
 */
applyFilter(filterValue: string) {
  this.processDataSource.filter = filterValue.trim().toLowerCase();
}


loadData() {
  this.firebaseProcess
    .getProcesssRef()
    .subscribe((processsList: Process[]) => {
        this.isLoading = false;
        this.processDataSource.data = processsList;
      },
      error => {
        this.isLoading = false;
        alert('[X] error al obtener los proceso: ' + error);
      }
    );
  // actualiza el componente.
  this.changeDetectorRefs.detectChanges();
}

editProcess(process: Process): void {
  console.log('edited: ', process);
  const dialogRef = this.dialog.open(EditProcessFormComponent, {
    width: '90%',
    data: process
  });
  dialogRef
    .afterClosed()
    .subscribe(result => {
      if (result) {
        console.log(' editado : ', process);
        this.firebaseProcess.editProcess(process);
      }
    });
}

deleteProcess(process: Process): void {
  const dialogRef = this.dialog.open(DeleteProcessFormComponent, {
    width: '4000px',
    data: process
  });
  dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.firebaseProcess
          .deleteProcess(process.key);
      }
    });
}

}
