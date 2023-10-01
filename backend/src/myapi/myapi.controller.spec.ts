import { Test, TestingModule } from '@nestjs/testing';
import { MyapiController } from './myapi.controller';

describe('MyapiController', () => {
  let controller: MyapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyapiController],
    }).compile();

    controller = module.get<MyapiController>(MyapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
