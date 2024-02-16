import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

// DI 컨테이너에 등록하기 위해 표시
@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    // 파일 읽기
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }
  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };

    // 파일 쓰기
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
