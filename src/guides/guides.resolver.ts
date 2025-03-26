import { Resolver, Query, Args,Mutation } from '@nestjs/graphql';
import {  UseGuards } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { Guide } from './guides.entity';
import { CreateGuideInput } from './create-guide.input'; 
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '../auth/auth.guard';
@Resolver(() => Guide)
export class GuidesResolver {
  constructor(private readonly guidesService: GuidesService) {}  
  @UseGuards(AuthGuard)
  @Query(() => [Guide])
  async guides() {
    return this.guidesService.findAll();
  }
/*  @UseGuards(JwtAuthGuard)
  @Query(() => Guide, { nullable: true })
  async user(@Args('username') username: string): Promise<Guide | undefined | null> {
    return this.guidesService.findOneObservable(username).toPromise();
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Guide)
  createUser(@Args('createUserInput') createUserInput: CreateGuideInput): Observable<Guide> {
    return this.guidesService.create(createUserInput);  
  }*/

}
