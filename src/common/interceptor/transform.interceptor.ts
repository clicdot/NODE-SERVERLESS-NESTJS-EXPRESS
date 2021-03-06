import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Response {
  response: any;
  data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Response> {
  constructor(private responseSvc) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();

    const version = (request.route.path).split('/')[2];

    const now = Date.now();
    return next.handle().pipe(map(data => {
      return ({ response: {
        code: reply.statusCode,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        function: {
          method: request.method || request.raw.method,
          url: (request.route && request.route.path) ? request.route.path : request.raw.url,
          version,
          ip: request.ip
        },
        responseTime: `${Date.now() - now}ms`
      }, data });
    }));
  }
}
