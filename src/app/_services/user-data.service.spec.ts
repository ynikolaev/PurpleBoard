import { TestBed, inject } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { User } from '../_models/user';

describe('UserDataService', () => {
  beforeEach(() => {
    //TestBed is a utility provided by @angular/core/testing to
    //configure and create an Angular testing module in which we want to
    //run our unit tests.
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
  });

  it('should be created', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllUsers()', () => {
    //inject the correct service from the TestBed injector in test function
    it('should return an empty array by default', inject([UserDataService], (service: UserDataService) => {
      expect(service.getAllUsers()).toEqual([]);
    }));

    it('should return all todos', inject([UserDataService], (service: UserDataService) => {
      let user1 = new User({ email: 'test@test.com', firstname: 'Yan', lastname: 'Nikolaev', password: 'password', firstTime: true, isAdmin: false });
      let user2 = new User({ email: 'test2@test2.com', firstname: 'Bob', lastname: 'Bobbino', password: 'bob123', firstTime: true, isAdmin: false });
      service.addUser(user1);
      service.addUser(user2);
      expect(service.getAllUsers()).toEqual([user1, user2]);
    }));
  });

  describe('#save(user)', () => {
    it('should automatically assign an incrementing id', inject([UserDataService], (service: UserDataService) => {
      let user1 = new User({ email: 'test@test.com', firstname: 'Yan', lastname: 'Nikolaev', password: 'password', firstTime: true, isAdmin: false });
      let user2 = new User({ email: 'test2@test2.com', firstname: 'Bob', lastname: 'Bobbino', password: 'bob123', firstTime: true, isAdmin: false });
      service.addUser(user1);
      service.addUser(user2);
      expect(service.getUserById(1)).toEqual(user1);
      expect(service.getUserById(2)).toEqual(user2);
    }));
  });

  describe('#deleteUserById(id)', () => {
    it('should remove user with the corresponding id', inject([UserDataService], (service: UserDataService) => {
      let user1 = new User({ email: 'test@test.com', firstname: 'Yan', lastname: 'Nikolaev', password: 'password', firstTime: true, isAdmin: false });
      let user2 = new User({ email: 'test2@test2.com', firstname: 'Bob', lastname: 'Bobbino', password: 'bob123', firstTime: true, isAdmin: false });
      service.addUser(user1);
      service.addUser(user2);
      expect(service.getAllUsers()).toEqual([user1, user2]);
      service.deleteUserById(1);
      expect(service.getAllUsers()).toEqual([user2]);
      service.deleteUserById(2);
      expect(service.getAllUsers()).toEqual([]);
    }));

    it('should not removing anything if user with corresponding id is not found', inject([UserDataService], (service: UserDataService) => {
      let user1 = new User({ email: 'test@test.com', firstname: 'Yan', lastname: 'Nikolaev', password: 'password', firstTime: true, isAdmin: false });
      let user2 = new User({ email: 'test2@test2.com', firstname: 'Bob', lastname: 'Bobbino', password: 'bob123', firstTime: true, isAdmin: false });
      service.addUser(user1);
      service.addUser(user2);
      expect(service.getAllUsers()).toEqual([user1, user2]);
      service.deleteUserById(3);
      expect(service.getAllUsers()).toEqual([user1, user2]);
    }));
  });

  describe('#updateUserById(id, values)', () => {
    it('should return user with the corresponding id and updated data', inject([UserDataService], (service: UserDataService) => {
      let user1 = new User({ email: 'test@test.com', firstname: 'Yan', lastname: 'Nikolaev', password: 'password', firstTime: true, isAdmin: false });
      service.addUser(user1);
      let updatedUser = service.updateUserById(1, {
        firstname: 'Ian'
      });
      expect(updatedUser.firstname).toEqual('Ian');
    }));

    it('should return null if user is not found', inject([UserDataService], (service: UserDataService) => {
      let user1 = new User({ email: 'test@test.com', firstname: 'Yan', lastname: 'Nikolaev', password: 'password', firstTime: true, isAdmin: false });
      service.addUser(user1);
      let updatedUser = service.updateUserById(2, {
        firstname: 'Ian'
      });
      expect(updatedUser).toEqual(null);
    }));

  });
});
