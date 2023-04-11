import { Injectable } from '@nestjs/common';
import { CreateFormInput } from './dto/create-form.input';
import { UpdateFormInput } from './dto/update-form.input';

@Injectable()
export class FormService {
  create(createFormInput: CreateFormInput) {
    return 'This action adds a new form';
  }

  findAll() {
    return `This action returns all form`;
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormInput: UpdateFormInput) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
