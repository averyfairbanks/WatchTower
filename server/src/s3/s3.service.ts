import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

const REGION = 'us-east-1';

@Injectable()
export class S3Service {
  s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region: REGION });
  }

  getPresignedUrl(userId: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: 'wt-user-images',
      Key: `${userId}/meals/${Date.now()}_meal.jpg`,
    });
    
    return getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    });
  }
}
