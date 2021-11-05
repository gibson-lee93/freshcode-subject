import { Test, TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../users/entities/user.entity';
import { MenusService } from '../menus/menus.service';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

jest.mock('../menus/menus.service');
jest.mock('./items.service');

describe('ItemsController', () => {
  let controller: ItemsController;

  let itemsService: ItemsService;
  let menusService: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService, MenusService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
    menusService = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('항목 등록', async () => {
    const createDto = {
      name: 'test',
      size: 'm',
      price: 4000,
      isSold: true,
      menuId: 1,
    };
    const param = {
      name: '1zzzzzz',
      size: 'con12',
      price: 73000,
      isSold: false,
      menu: {
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: 'tes13',
        description: 'codn1',
        isSold: false,
        badge: 'new',
        items: [],
        tags: [],
        category: null,
      },
      deletedAt: null,
      id: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createUser: User = {
      id: 1,
      email: 'test@gdfsadf.coffm',
      password: '123',
      role: UserRole.admin,
      loginedAt: new Date(),
      hashPassword: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    jest.spyOn(itemsService, 'createItem').mockResolvedValue(param);

    const result = await controller.createItem(createDto, createUser);
    expect(result).toMatchObject(param);
  });

  it('항목 삭제', async () => {
    const createUser: User = {
      id: 1,
      email: 'test@gdfsadf.coffm',
      password: '123',
      role: UserRole.admin,
      loginedAt: new Date(),
      hashPassword: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    jest
      .spyOn(itemsService, 'deleteItem')
      .mockResolvedValue({ message: '항목 삭제 완료' });

    const result = await controller.deleteItem(1, createUser);
    expect(result).toMatchObject({ message: '항목 삭제 완료' });
  });

  it('항목 수정', async () => {
    const createUser: User = {
      id: 1,
      email: 'test@gdfsadf.coffm',
      password: '123',
      role: UserRole.admin,
      loginedAt: new Date(),
      hashPassword: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const updateDto = {
      name: 'test',
      size: 'm',
      price: 4000,
      isSold: true,
      menuId: 1,
      itemId: 1,
    };
    const param = {
      name: '1zzzzzz',
      size: 'con12',
      price: 73000,
      isSold: false,
      menu: {
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: 'tes13',
        description: 'codn1',
        isSold: false,
        badge: 'new',
        items: [],
        tags: [],
        category: null,
      },
      deletedAt: null,
      id: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(itemsService, 'updateItem').mockResolvedValue(param);

    const result = await controller.updateItem(updateDto, createUser);
    expect(result).toMatchObject(param);
  });
});
