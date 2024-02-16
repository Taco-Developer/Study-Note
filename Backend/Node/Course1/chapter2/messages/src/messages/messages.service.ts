import { Injectable } from '@nestjs/common';
// 데이터를 읽고 저장하기 위해 MessagesRepository import
import { MessagesRepository } from './messages.repository';

// @Injectable() DI 컨테이너 등록하기 위해 표시
@Injectable()
export class MessagesService {
  // 의존성 주입을 위한 리팩토링
  constructor(public messagesRepo: MessagesRepository) {}

  //   messagesRepo: MessagesRepository;
  //   constructor(messagesRepo: MessagesRepository) {
  //     this.messagesRepo = messagesRepo;

  // Service에서 사용하기 위해 Repository 인스턴스 생성 => 의존성이 있음
  // Service가 자체적으로 의존성을 생성하고 있음
  // 실제 앱에서는 자체적으로 의존성 생성해서 사용 X => NestJS 의존성 주입 사용
  // this.messagesRepo = new MessagesRepository();
  //   }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
