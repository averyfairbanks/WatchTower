import { Controller, Param, Post } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('photo-upload/create/:user_id')
  getPresignedUrl(@Param('user_id') userId: string): Promise<string> {
    return this.s3Service.getPresignedUrl(userId);
  }
}
