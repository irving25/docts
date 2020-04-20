import {IVacancy} from './i-vacancy.interface';
import {VacancyLevel} from './vacancy-level.enum';

export class Vacancy implements IVacancy {
  key: string;
  id: string;
  name: string;
  department: string;
  group: string;
  labels: string [];
  level: VacancyLevel;
  quantityAvailable: number;
  softSkill: any[];
  hardSkill: any[];
  // tslint:disable-next-line:ban-types
  salaryRange: number [];
  timeStamp: number;
  active: boolean;

  constructor(id: string, name: string, department: string, group: string, labels: string[],
              level: VacancyLevel, quantityAvailable: number, softSkill: any[], hardSkill: any[]) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.group = group;
    this.labels = labels;
    this.level = level;
    this.quantityAvailable = quantityAvailable;
    this.active = true;
    this.softSkill = softSkill;
    this.hardSkill = hardSkill;
  }
}
