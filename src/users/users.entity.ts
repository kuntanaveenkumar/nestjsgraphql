import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  user_id: number;

  @Field()
  username: string;

  @Field()
  password: string;
}
