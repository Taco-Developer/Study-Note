import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // 의존성 주입을 위한 리팩토링
  constructor(public messagesService: MessagesService) {}

  // messagesService: MessagesService;
  // constructor(messagesService: MessagesService) {
  //   this.messagesService = messagesService;

  // 실제 앱에선 이렇게 사용하지 말고 의존성 주입 사용
  // this.messagesService = new MessagesService();
  // }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
