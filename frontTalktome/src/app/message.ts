import { User } from './user';

export class Message {
  id: number;
  sender: User;
  content: string;
  messageType: string;
}
