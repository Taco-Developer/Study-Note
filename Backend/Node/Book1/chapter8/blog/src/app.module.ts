import { Module } from '@nestjs/common';

import { BlogController } from './blog.controller';

import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';

import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';

import { config } from 'dotenv';
config();

const DB_ID = process.env.DB_ID;
const DB_PASSWORD = process.env.DB_PASSWORD;

@Module({
  imports: [
    // 몽고디비 연결 설정
    MongooseModule.forRoot(
      `mongodb+srv://${DB_ID}:${DB_PASSWORD}@node.5fusz1w.mongodb.net/blog?retryWrites=true&w=majority`,
    ),
    // 몽고디비 스키마 설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  // 프로바이더 설정
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
