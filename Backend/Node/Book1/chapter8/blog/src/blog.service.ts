import { Injectable } from '@nestjs/common';

// 게시글 타입 정보
import { PostDto } from './blog.model';

// 리포지토리 클래스와 인터페이스
// import { BlogFileRepository } from './blog.repository';
import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
  // 게시글 배열 선언
  //   blogRepository: BlogRepository;

  // 블로그 리포지토리 객체 생성
  //   constructor() {
  //     this.blogRepository = new BlogFileRepository();
  //   }

  // 생성자를 통한 의존성 주입
  constructor(private blogRepository: BlogMongoRepository) {}

  // 모든 게시글 가져오기
  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  // 게시글 작성
  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  // 게시글 하나 가져오기
  async getPost(id: string) {
    return await this.blogRepository.getPost(id);
  }

  // 게시글 삭제
  delete(id: string) {
    this.blogRepository.deletePost(id);
  }

  // 게시글 업데이트
  updatePost(id: string, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}
