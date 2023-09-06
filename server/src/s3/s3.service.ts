import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { CreateGetUrlDto, CreatePutUrlDto } from './dto/create-url.dto';

const REGION = 'us-east-1';

@Injectable()
export class S3Service {
  s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: REGION,
      credentials: fromIni({ profile: '333355343403_AdministratorAccess' }),
    });
  }

  getPresignedPutUrl(dto: CreatePutUrlDto): Promise<string> {
    const { userId, type, filename } = dto;

    const command = new PutObjectCommand({
      Bucket: 'wt-user-images',
      Key: `${userId}/meals/${filename}`,
      ContentType: `${type}; charset=ascii`,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    });
  }

  getPresignedGetUrl(dto: CreateGetUrlDto): Promise<string> {
    const {userId, filename} = dto;

    const command = new GetObjectCommand({
      Bucket: 'wt-user-images',
      Key: `${userId}/meals/${filename}`,
    });

    return getSignedUrl(this.s3Client, command, {expiresIn: 200000})
  }
}
