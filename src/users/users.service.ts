// import { Injectable } from '@nestjs/common';
// import { Observable, of } from 'rxjs';
// import { UserRequest, UserResponse, CreateUserRequest } from './users.interface';
// import { User } from './users.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// @Injectable()
// export class UsersService {



//   private users: User[] = [
//     { id: '1', name: 'John Doe', email: 'john@example.com' },
//     { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
//   ];

//   findAll(): User[] {
//     return this.users;
//   }
//   getUser(data: UserRequest): Observable<UserResponse> {
//     const user = this.users.find(user => user.id === data.id);
//     return of(user || { id: '', name: 'Not Found', email: '' });
//   }

//   createUser(data: CreateUserRequest): Observable<UserResponse> {
//     const newUser = { id: String(this.users.length + 1), ...data };
//     this.users.push(newUser);
//     return of(newUser);
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { User } from './users.orm.entity';
import { User as UserEntity } from './users.orm.entity';
import { CreateUserInput } from './create-user.input';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
    findAll(): Observable<User[]> {
        return from(this.userRepository.find());
    }
    findOneObservable(username: string): Observable<User | undefined | null> {
        return from(
            this.userRepository.findOne({ where: { username } })
        );
    }
    create(createUserInput: CreateUserInput): Observable<User> {
        const userEntity = this.userRepository.create(createUserInput);
        return from(this.userRepository.save(userEntity));
    }
}