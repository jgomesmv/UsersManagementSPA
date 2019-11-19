export class UserModel {
  public name: string;
  public previousName: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
