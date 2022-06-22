export interface User {
  id: number;
  username: string;
  email: string;
}

export class UserLog {
  constructor(public username: string, public password: string) {}
}

export class UserRegister extends UserLog {
  constructor(username: string, password: string, public email: string) {
    super(username, password);
  }
}
