import { Resolver, Query, Args,Mutation } from '@nestjs/graphql';
import {  UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserInput } from './create-user.input'; 
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '../auth/auth.guard';
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}  
  @UseGuards(AuthGuard)
  @Query(() => [User])
  async users() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => User, { nullable: true })
  async user(@Args('username') username: string): Promise<User | undefined | null> {
    return this.usersService.findOneObservable(username).toPromise();
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Observable<User> {
    return this.usersService.create(createUserInput);  
  }

}
