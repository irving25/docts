export interface Roles {
  candidato?: boolean;
  reclutador?: boolean;
  admin?: boolean;
}

export class User {

  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  roles: Roles;

}
