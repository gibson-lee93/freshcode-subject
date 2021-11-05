import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Category } from '../categories/entities/category.entity';
import { MenusRepository } from './menus.repository';
import { MenusService } from './menus.service';

const mockMenusRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createMenu: jest.fn(() => Promise.reject('error')),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockMenu = {
  name: 'test name',
  description: 'test desc',
  isSold: false,
  badge: 'NEW',
  items: [],
  category: [],
  tags: [],
};

describe('MenusService', () => {
  let menusService: MenusService;
  let menusRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MenusService,
        { provide: MenusRepository, useFactory: mockMenusRepository },
      ],
    }).compile();

    menusService = module.get(MenusService);
    menusRepository = module.get(MenusRepository);
  });

  describe('getMenus', () => {
    it('전체 조회 후 Menu[] 리턴', async () => {
      menusRepository.find.mockResolvedValue('someValue');
      const result = await menusService.getMenus(0, 0);
      expect(result).toEqual('someValue');
    });
  });

  describe('getMenuById', () => {
    it('id로 조회 후 Menu 리턴', async () => {
      menusRepository.findOne.mockResolvedValue(mockMenu);
      const result = await menusService.getMenuById(1);
      expect(result).toEqual(mockMenu);
    });

    it('조회되지 않는 id일 경우 에러 리턴', async () => {
      menusRepository.findOne.mockResolvedValue(null);
      expect(menusService.getMenuById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createMenu', () => {
    const mockCreateMenuDto = {
      name: 'test name',
      description: 'test desc',
      isSold: false,
      badge: 'new',
      category: 'SALAD',
    };

    const mockCategory: Category = {
      name: 'SALAD',
      menus: [],
      id: 1,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };
    it('Menu를 생성하고 Menu 리턴', async () => {
      menusRepository.createMenu.mockResolvedValue(mockMenu);
      const result = await menusService.createMenu(
        mockCreateMenuDto,
        mockCategory,
      );
      expect(result).toEqual(mockMenu);
    });

    it('Menu 생성 실패시 에러 리턴', async () => {
      menusRepository.createMenu.mockResolvedValue(null);
      try {
        await menusService.createMenu(mockCreateMenuDto, mockCategory);
      } catch (error) {
        expect(error).toEqual(InternalServerErrorException);
      }
    });
  });

  describe('updateMenu', () => {
    const mockUpdateMenuDto = {
      name: 'test name',
      description: 'test desc',
      isSold: false,
      badge: 'NEW',
    };
    it('Menu를 update하고 Menu 리턴', async () => {
      menusRepository.findOne.mockResolvedValue(mockMenu);
      const result = await menusService.updateMenu(1, mockUpdateMenuDto);
      expect(result).toEqual(mockMenu);
    });

    it('Menu update 실패시 에러 리턴', async () => {
      menusRepository.update.mockResolvedValue(null);
      expect(menusService.updateMenu(1, mockUpdateMenuDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteMenu', () => {
    it('Menu를 삭제하고 메세지 리턴', async () => {
      menusRepository.findOne.mockResolvedValue(mockMenu);
      const result = await menusService.deleteMenu(1);
      expect(result).toEqual({ message: '메뉴 삭제 완료' });
    });

    it('Menu 삭제 실패시 에러 리턴', async () => {
      menusRepository.delete.mockResolvedValue(null);
      expect(menusService.deleteMenu(1)).rejects.toThrow(NotFoundException);
    });
  });
});
