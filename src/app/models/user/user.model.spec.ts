import { UserModel } from './user.model';

describe('UserModel', () => {
  it('should create an instance', () => {
    expect(new UserModel({name: 'testUser', previousName: null})).toBeTruthy();
  });
});
