import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  // Placeholder for last id to simulate
  // automatic incrementing of ids
  lastId: number = 0;

  // Placeholder for users
  users: User[] = [];

  constructor() {
  }

  // Simulate POST /users
  addUser(user: User): UserDataService {
    if (!user.id) {
      user.id = ++this.lastId;
    }
    this.users.push(user);
    return this;
  }

  // Simulate DELETE /users/:id
  deleteUserById(id: number): UserDataService {
    this.users = this.users
      .filter(user => user.id !== id);
    return this;
  }

  // Simulate PUT /users/:id
  updateUserById(id: number, values: Object = {}): User {
    let user = this.getUserById(id);
    if (!user) {
      return null;
    }
    Object.assign(user, values);
    return user;
  }

  // Simulate GET /users
  getAllUsers(): User[] {
    return this.users;
  }

  // Simulate GET /users/:id
  getUserById(id: number): User {
    return this.users
      .filter(user => user.id === id)
      .pop();
  }

}
