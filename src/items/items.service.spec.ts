import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsRepository } from './items.repository';
import { ItemsService } from './items.service';

const mockUserRepository = () => ({
  createItem: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('ItemsService', () => {
  let service: ItemsService;
  let itemsRepository: MockRepository<ItemsRepository>;

  type MockRepository<T = any> = Partial<
    Record<keyof Repository<T>, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(ItemsRepository),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemsRepository = module.get<MockRepository<ItemsRepository>>(
      getRepositoryToken(ItemsRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('삭제 시 유효한 항목 id가 아님', async () => {
    expect.assertions(3);
    itemsRepository.findOne.mockResolvedValue(undefined);
    try {
      const result = await service.deleteItem(1);
    } catch (e) {
      expect(e.message).toBe('유효한 항목 id가 아닙니다.');
      expect(e.status).toBe(404);
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('삭제 완료', async () => {
    itemsRepository.findOne.mockResolvedValue(1);
    itemsRepository.delete.mockResolvedValue(1);
    const result = await service.deleteItem(1);

    expect(result).toMatchObject({ message: '항목 삭제 완료' });
  });

  it('항목 수정', async () => {
    const updateDto: UpdateItemDto = {
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
    itemsRepository.findOne.mockResolvedValue(updateDto);
    const result = await service.updateItem(updateDto);
    itemsRepository.save.mockResolvedValue(param);
    expect(result).toMatchObject(updateDto);
  });
});
