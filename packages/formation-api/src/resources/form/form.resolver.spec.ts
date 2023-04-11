import { Test, TestingModule } from '@nestjs/testing';
import { FormResolver } from './form.resolver';
import { FormService } from './form.service';

describe('FormResolver', () => {
  let resolver: FormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormResolver, FormService],
    }).compile();

    resolver = module.get<FormResolver>(FormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
