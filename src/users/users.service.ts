import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  isMarried: boolean;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'John',
      email: '6tGt4@example.com',
      age: 30,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Jane',
      email: 'kMgBt@example.com',
      age: 25,
      gender: 'female',
      isMarried: true,
    },
    {
      id: 3,
      name: 'Bob',
      email: 'B4L4M@example.com',
      age: 40,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 4,
      name: 'Alice',
      email: 'm6t4o@example.com',
      age: 35,
      gender: 'female',
      isMarried: true,
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateData: Partial<Omit<User, 'id'>>): User {
    const user = this.getUserById(id);
    const updatedUser = { ...user, ...updateData };
    const index = this.users.findIndex((u) => u.id === id);
    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: number): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }
}
