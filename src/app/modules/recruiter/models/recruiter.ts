import { RecruiterLevel } from './recruiter-level.enum';


export class Recruiter {
key: string;
id: string;
namel: string;
lastname: string;
nationality: string;
age: number;
gender: string;
// tslint:disable-next-line: variable-name
birth_date: number;
rfc: string;
ssc: string;
start_date_labor: number;
end_date_labor: number;
active: boolean;
intern: boolean;
phone: number;
cellphone: number;
social_networks: string[];
reference_people: string[];

constructor(
  id: string,
  namel: string,
  lastname: string,
  nationality: string,
  age: number,
  gender: string,
  birth_date: number,
  rfc: string,
  ssc:string,
  start_date_labor: number,
  end_date_labor: number,
  active:boolean,
  intern:boolean,
  phone:number,
  cellphone:number
  ) {
    this.id = id;
    this.namel = namel;
    this.lastname = lastname;
    this.nationality =  nationality;
    this.age = age;
    this.gender = gender;
    this.birth_date = birth_date;
    this.rfc = rfc;
    this.ssc = ssc;
    this.start_date_labor = start_date_labor;
    this.end_date_labor = end_date_labor;
    this.active = active;
    this.intern = intern;
    this.phone = phone;
    this.cellphone = cellphone;
  }
}
