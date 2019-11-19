export class UserModel {
  public name: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
