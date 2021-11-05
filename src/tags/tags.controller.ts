import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  createTag(@Body() createTagDto : CreateTagDto): Promise<Tag>{
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  getTagAll(): Promise<Tag[]>{
    return this.tagsService.getTagAll();
  }

  @Get('/:id')
  getTagById(@Param('id') id:string): Promise<Tag>{
   return this.tagsService.getTagById(Number(id)); 
  }

  @Patch('/:id')
  updateTag(
      @Param('id') id:number,
      @Body() updateTagDto:UpdateTagDto,
    ): Promise<Tag> {
    return this.tagsService.updateTag(Number(id), updateTagDto); 
  }

  @Delete('/:id')
  deleteTag(
    @Param('id') id:number
  ): Promise<{message:string}>{
    return this.tagsService.deleteTag(Number(id)); 
  }

  }
