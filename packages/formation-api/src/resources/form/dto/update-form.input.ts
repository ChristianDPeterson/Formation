import { CreateFormInput } from './create-form.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFormInput extends PartialType(CreateFormInput) {
  @Field(() => Int)
  id: number;
}
