import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }[] = [
    {
      id: 1,
      name: 'John',
      age: 30,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Jane',
      age: 25,
      gender: 'female',
      isMarried: true,
    },
    {
      id: 3,
      name: 'Bob',
      age: 40,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 4,
      name: 'Alice',
      age: 35,
      gender: 'female',
      isMarried: true,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
