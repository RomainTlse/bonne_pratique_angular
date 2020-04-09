import {ErrorHandler, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {MessageService, Type} from '../../ui/services/message.service';
import {Message} from '../../ui/interfaces/message';

@Injectable()

export class ErrorsHandlerService implements ErrorHandler{

  private _serviceName: string;
  private _operation: string;
  private _messageText: string;

  constructor(private messageService: MessageService) { }

  set serviceName(value: string) {
    this._serviceName = value;
  }

  set operation(value: string) {
    this._operation = value;
  }

  set messageText(value: string) {
    this._messageText = value;
  }

  public handleError(error: any): Observable<never> {
    console.error(error); // log to console instead

    const messageFull: Message = {
      type: Type.Error,
      title: 'Erreur lors de l\'opération ' + `${this._serviceName}: ${this._operation}`,
      message: `${this._messageText}`
    };

    this.messageService.add(messageFull);

    return throwError(this._messageText);
  }
}
