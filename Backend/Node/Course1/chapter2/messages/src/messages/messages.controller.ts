import { Controller, Post, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessage() {}

  @Get('/:id')
  getMessage() {}
}
