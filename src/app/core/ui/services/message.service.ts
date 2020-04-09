import { Injectable } from '@angular/core';
import {Message} from '../interfaces/message';

export enum Type {
  Success = 'success',
  Information = 'information',
  Warning = 'warning',
  Error = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Array<Message>;

  constructor() {
    this.messages = [];
  }

  add(message: Message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
