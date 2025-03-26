import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuideInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
