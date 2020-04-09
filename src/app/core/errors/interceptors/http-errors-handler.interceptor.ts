import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {MessageService, Type} from '../../ui/services/message.service';
import {Message} from '../../ui/interfaces/message';

@Injectable()
export class HttpErrorsHandlerInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.error(error); // log to console instead

          const messageText: string = (error.error instanceof ErrorEvent) ?
            error.error.message :
            `server returned code ${error.status} with body "${error.error.error}"`;

          const messageFull: Message = {
            type: Type.Error,
            title: 'Erreur lors de l\'opération '/* + `${serviceName}: ${operation}`*/,
            message: `${messageText}`
          };

          // TODO: better job of transforming error for user consumption
          this.messageService.add(messageFull);

          return throwError(messageText);
        })
      )
  }
}
