import { MessageInterface } from './MessageInterface';

export interface ConversationInterface {
  id?: number;
  pathImage: string;
  name: string;
  date: string;
  messages: MessageInterface[];
}
