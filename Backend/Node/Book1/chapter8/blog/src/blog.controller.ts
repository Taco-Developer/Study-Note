import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';

// 블로그 서비스
import { BlogService } from './blog.service';

// 인터페이스
import { PostDto } from './blog.model';

@Controller('blog')
export class BlogController {
  // blogService: BlogService;

  // 생성자에서 블로그 서비스 생성
  // constructor() {
  //   this.blogService = new BlogService();
  // }

  // 블로그 서비스 주입
  constructor(private blogService: BlogService) {}

  // 모든 게시글 가져오기
  @Get()
  // 비동기 지원하는 메서드로 시그니처 변경
  async getAllPosts() {
    console.log('모든 게시글 가져오기');

    // 블로그 서비스에서 사용하는 메서드가 비동기로 변경되었으므로 await 사용
    const posts = await this.blogService.getAllPosts();
    console.log(posts);
    return posts;
  }

  // 게시글 생성
  @Post()
  createPost(@Body() postDto: PostDto) {
    console.log('게시글 작성');
    this.blogService.createPost(postDto);
    return 'success';
  }

  // 게시글 하나 가져오기
  @Get('/:id')
  async getPost(@Param('id') id: string) {
    console.log('게시글 하나 가져오기');

    const post = await this.blogService.getPost(id);
    console.log(post);
    return post;
  }

  // 게시글 삭제
  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.blogService.delete(id);
    return 'success';
  }

  // 게시글 업데이트
  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    console.log('게시글 업데이트', id, postDto);
    return this.blogService.updatePost(id, postDto);
  }
}
