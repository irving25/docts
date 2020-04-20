import { CandidateLevel } from './candidate-level.enum';


export class Candidate {
    key: string;
    id: string;
    nombres: string;
    apellidoP: string;
    apellidoM: string;
    estadoC: string;
    rfc: number;
    nss: number;
    telefonoP: number;
    telefonoS: number;
    email: string;
    gradoE: string;
    titulado: string;
    fecha_egreso: string;

    constructor(
        id: string,
        nombres: string,
        apellidoP: string,
        apellidoM: string,
        estadoC: string,
        rfc: number,
        nss: number,
        telefonoP: number,
        telefonoS: number,
        email: string,
        gradoE: string,
        titulado: string,
        fecha_egreso: string,
    ) { 
        this.id = id;
        this.nombres = nombres;
        this.apellidoP = apellidoP;
        this.apellidoM = apellidoM;
        this.estadoC = estadoC;
        this.rfc = rfc;
        this.nss = nss;
        this.telefonoP = telefonoP;
        this.telefonoS = telefonoS;
        this.email = email;
        this. gradoE = gradoE;
        this.titulado = titulado;
        this.fecha_egreso = fecha_egreso;
}
}