import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

// 모든 클래스를 의미
interface ClassConstructor {
  new (...args: any[]): {};
}

// 긴 데코레이터를 짧고 직관적인 데코레이터로 변환
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // Run something before a request is handled by the request handler
    // console.log(`I'm running before the handler.`, context);

    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // console.log(`I'm running before response is sent out`, data);
        // data를 UserDto 인스턴스로 변환
        return plainToInstance(this.dto, data, {
          // JSON으로 변환하려고 할 때마다 Expose 표시된 속성만 공유하거나 노출함
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
