import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  // providers: 다른 클래스를 위해 의존성으로 사용할 수 있는 것 모음
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
