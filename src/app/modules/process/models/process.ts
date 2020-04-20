// import { Processlevel } from './process-level.enum';

export class Process {
  key: string;
  id: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  estatus_general: string;
  actividad_actual: string;
  id_reclutador: string;
  id_candidato: string;
  id_examen: string;
  lista_actividades: string;

    constructor(
      id: string,
      fecha_creacion: string,
      fecha_modificacion: string,
      estatus_general: string,
      actividad_actual: string,
      id_reclutador: string,
      id_candidato: string,
      id_examen: string,
      lista_actividades: string,
    ) {
      this.id = id;
      this.fecha_creacion = fecha_creacion;
      this.fecha_modificacion = fecha_modificacion;
      this.estatus_general = estatus_general;
      this.actividad_actual = actividad_actual;
      this.id_reclutador = id_reclutador;
      this.id_candidato = id_candidato;
      this.id_examen = id_examen;
      this.lista_actividades = lista_actividades;
    }

}
