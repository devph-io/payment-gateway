import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { duration } from 'moment';

@Injectable()
export class ReactionInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ReactionInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // API triggered by client
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() => { 
                    const reaction = duration(Date.now() - now, 'milliseconds')
                    this.logger.log(`fin: ${reaction.asSeconds()}ms`) 
                }),
            );
    }
}
