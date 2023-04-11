import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFormInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
