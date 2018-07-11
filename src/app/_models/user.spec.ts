import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let user = new User({
      email: 'test@test.com',
      firstname: 'Yan',
      lastname: 'Nikolaev',
      password: 'password',
      firstTime: true
    });
    expect(user.email).toEqual('test@test.com');
    expect(user.firstname).toEqual('Yan');
    expect(user.lastname).toEqual('Nikolaev');
    expect(user.password).toEqual('password');
    expect(user.firstTime).toEqual(true);
  });
});
