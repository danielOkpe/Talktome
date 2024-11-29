import { Injectable } from '@angular/core';
import { Message } from './message';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: Message;
  constructor() {}

  getContent(msg: Message): string {
    return msg.content;
  }
  getSender(msg: Message): User {
    return msg.sender;
  }
  getType(msg: Message): string {
    return msg.messageType;
  }

  setContent(content: string) {
    this.message.content = content;
  }
  setSender(sender: User) {
    this.message.sender = sender;
  }
  setType(messageType: string) {
    this.message.messageType = messageType;
  }

}
