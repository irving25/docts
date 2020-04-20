import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FirebaseVacancyServiceService} from '../../service/firebase-vacancy-service.service';
import {Vacancy} from '../../models/vacancy.model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditVacancyFormComponent} from '../edit-vacancy-form/edit-vacancy-form.component';
import {DeleteVacancyFormComponent} from '../delete-vacancy-form/delete-vacancy-form.component';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VacanciesListComponent implements AfterViewInit {
  @Input() childTemplate: TemplateRef<any>;

  /* Table columns:
   * Definicion de las columnas que queremos mostrar,Arreglo de columnDef.
   * cada columna tiene un nombre, un header y una celula, la celula contiene el valor
   * que debera ser mostrado en cada columna.
   * */
  columns = [
    {columnDef: 'name', header: 'nombre', cell: (row: Vacancy) => `${row.name}`},
    {
      columnDef: 'department',
      header: 'departamento',
      cell: (row: Vacancy) => `${row.department}`, // Cada columna hace referencia a una propepiedad de un objeto Vacancy
    },
    {columnDef: 'group', header: 'grupo', cell: (row: Vacancy) => `${row.group}%`},
    {
      columnDef: 'quantityAvailable',
      header: 'disponibles',
      cell: (row: Vacancy) => `${row.quantityAvailable}%`,
    },

  ];

  vacancyDataSource: MatTableDataSource<Vacancy>; // Se define la fuente de datos que contendra toda la informacion de la tabla.
  vacancyColumnsToDisplay = this.columns.map(x => x.columnDef); // Funcion para obtener las referencias.
  expandedVacancyElement: Vacancy | null; // Documento Detalle del objeto columna.
  @ViewChild(MatSort, {static: true}) sort: MatSort;  // Utileria para sorteo de datos en la tabla
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator; // Utileria para paginado de datos.
  resultsLength = 0; // Variable para atrapar el tamaño de los objetos en la tabla.
  isLoading = true; // Variable para habilitar el componte spinner.

  /**
   * Metodo constructor
   * @param firebaseVacancy Objeto de servicio para que sirve para comunicarse con firebase.
   * @param changeDetectorRefs objeto de ayuda en el framework de angular material. provides change detection functionality.
   * A change-detection tree collects all views that are to be checked for changes.
   * @param dialog Objeto para arrojar un dialogo de notificacion.
   */
  constructor(private firebaseVacancy: FirebaseVacancyServiceService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  /**
   * Metodo que implementa un objeto de ciclo de vida del componente, es ejecutado en cierto momento
   * dentro del ciclo de vida del compoenente, ver @https://angular.io/guide/lifecycle-hooks.
   */
  ngAfterViewInit() {
    this.vacancyDataSource = new MatTableDataSource();  // se crea la instancia de la fuente de datos.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); // Se inicializa el obejto para sortear y el paginador.
    this.vacancyDataSource.sort = this.sort; // Se asigna el sorteador con la fuente de datos.
    this.vacancyDataSource.paginator = this.paginator; // Se le asiga el paginador a la fuente de datos.
    this.loadData();
  }

  /**
   * Este metodo es ejectuado al momento de teclear algun valor en el componente de busqueda de la tabla.
   * @param filterValue - valor tecleado en el componente, el valor es filtrado dentro de los valores de
   * loa fuente de datos.
   */
  applyFilter(filterValue: string) {
    this.vacancyDataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Se efectua la carga de datos que seran mostrados en la tabla.
   */
  loadData() {
    this.firebaseVacancy
      .getVacanciesRef() // Se solicitan los datos a traves del servicio firebase para vacantes.
      // al ser un metodo reactivo se suscribe la respuesta y mediante una funcion asincrona
      // asignamos los valores obtenidos desde el servicio hacia la fuente de datos, tambien participa
      // el componente de loading.
      .subscribe((vacanciesList: Vacancy[]) => {
          this.isLoading = false; // apaga el componente loading...
          this.vacancyDataSource.data = vacanciesList;  // la lista de vacantes
        },
        // En caso de error... ¿Que hacemos con el?
        error => {
          this.isLoading = false; // apagando el loading
          alert('[X] error al obtener las vacantes: ' + error);
        }
      );
    // actualiza el componente.
    this.changeDetectorRefs.detectChanges();
  }


  editVacany(vacancy: Vacancy): void {
    console.log('edited: ', vacancy);
    const dialogRef = this.dialog.open(EditVacancyFormComponent, {
      width: '90%',
      data: vacancy
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(' editado : ', vacancy);
          this.firebaseVacancy.editVacancy(vacancy);
        }
      });
  }

  deleteVacancy(vacancy: Vacancy): void {
    const dialogRef = this.dialog.open(DeleteVacancyFormComponent, {
      width: '4000px',
      data: vacancy
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.firebaseVacancy
            .deleteVacancy(vacancy.key);
        }
      });
  }

}

