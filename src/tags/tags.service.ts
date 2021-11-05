import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { SelectTagDto } from './dto/select-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
  ) {}

  createTag(createTagDto:CreateTagDto) : Promise<Tag>{
    return this.tagsRepository.createTag(createTagDto);
  }

  async getTagAll() : Promise<Tag[]>{
    return this.tagsRepository.find({});
  }
  
  async getTagById(id:number) : Promise<Tag>{
    return this.tagsRepository.findOne(id);
  }

  async updateTag(id: number, updateTagDto:UpdateTagDto) : Promise<Tag>{
    //TODO : id 유효성 검사 
    try {
      const updateFin = await this.tagsRepository.save(updateTagDto); 
      return updateFin; 
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTag(id: number) : Promise<{message:string}>{
    await this.getTagById(id); 
    if(!await this.tagsRepository.delete({id})){
      return {message: "삭제가 완료되었습니다."}
    }else{
      return {message: "삭제 도중 오류가 발생하였습니다."}
    }
  }


}
