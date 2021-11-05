import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseGuards(AuthGuard())
  @Post()
  createTag(
    @Body() createTagDto: CreateTagDto,
    @GetUser() user: User,
  ): Promise<Tag> {
    this.tagsService.checkAdmin(user);
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  getTagAll(): Promise<Tag[]> {
    return this.tagsService.getTagAll();
  }

  @Get('/:id')
  getTagById(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.getTagById(Number(id));
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  updateTag(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @GetUser() user: User,
  ): Promise<Tag> {
    this.tagsService.checkAdmin(user);
    return this.tagsService.updateTag(Number(id), updateTagDto);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteTag(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    this.tagsService.checkAdmin(user);
    return this.tagsService.deleteTag(Number(id));
  }
}
