import { CandidateLevel } from './candidate-level.enum';


export class Candidate {
    key: string;
    id: string;
    nombres: string;
    apellidoP: string;
    apellidoM: string;
    //estadoC: string;
    //rfc: number;
    //nss: number;
    //telefonoP: number;
    telefonoS: number;
    email: string;
    //gradoE: string;
    //titulado: string;
    //fecha_egreso: string;
    cedula: string;
    password: string;
    rol: string;
    
    constructor(
        id: string,
        nombres: string,
        apellidoP: string,
        apellidoM: string,
        //estadoC: string,
        //rfc: number,
        //nss: number,
        //telefonoP: number,
        telefonoS: number,
        
        //gradoE: string,
        //titulado: string,
        //fecha_egreso: string,
        cedula: string,
        password: string,
        email: string,
        rol: string
    ) { 
        this.id = id;
        this.nombres = nombres;
        this.apellidoP = apellidoP;
        this.apellidoM = apellidoM;
       // this.estadoC = estadoC;
       // this.rfc = rfc;
        //this.nss = nss;
        //this.telefonoP = telefonoP;
        this.telefonoS = telefonoS;
        this.email = email;
       // this. gradoE = gradoE;
        //this.titulado = titulado;
        //this.fecha_egreso = fecha_egreso;
        this.cedula = cedula;
        this.password = password;
        this.email = email;
        this.rol = rol;
}
}