import { Message } from './message';

export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  messages: Array<Message>;
}
