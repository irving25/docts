import {VacancyLevel} from './vacancy-level.enum';

export interface IVacancy {

  id: string;
  name: string;
  department: string;
  group: string;
  labels: string [];
  level: VacancyLevel;
  quantityAvailable: number;
  softSkill: string[];
  hardSkill: string[];
  // tslint:disable-next-line:ban-types
  salaryRange: number [];
  timeStamp: number;
  active: boolean;

}
