import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class EventEmitterInterceptor implements NestInterceptor {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass().name; // Get controller name
    const handler = context.getHandler().name; // Get method name

    return next.handle().pipe(
      tap((response) => {
        // Ensure it's from the OrderController and create method
        if (
          controller === 'OrderController' &&
          handler === 'create' &&
          response?.id
        ) {
          this.eventEmitter.emit('ORDER_PLACED', { order_id: response.id });
        }
      }),
    );
  }
}
