import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormResolver } from './form.resolver';

@Module({
  providers: [FormResolver, FormService]
})
export class FormModule {}
