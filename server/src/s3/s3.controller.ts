import { Body, Controller, Post } from '@nestjs/common';
import { CreateGetUrlDto, CreatePutUrlDto } from './dto/create-url.dto';
import { S3Service } from './s3.service';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('photo-upload/create')
  getPresignedPutUrl(@Body() dto: CreatePutUrlDto): Promise<string> {
    return this.s3Service.getPresignedPutUrl(dto);
  }
}
