import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UserRequest, UserResponse, CreateUserRequest } from './users.interface';
import { Observable } from 'rxjs';
import { User } from './users.orm.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//   @GrpcMethod('UserService', 'GetUser')
//   getUser(data: UserRequest): Observable<UserResponse | undefined | null> {
//     return this.usersService.getUser(data);
//   }

//   @GrpcMethod('UserService', 'CreateUser')
//   createUser(data: CreateUserRequest): Observable<UserResponse> {
//     return this.usersService.createUser(data);
//   }
}
