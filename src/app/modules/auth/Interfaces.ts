import { ConversationInterface } from '../global/interfaces/ConversationInterface';
import { MessageInterface } from '../global/interfaces/MessageInterface';
import { LoginInterface, UserModel } from '../global/interfaces/UserModel';

export interface AuthContextType {
  user: UserModel | null;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  conversations: {
    id?: number;
    pathImage: string;
    name: string;
    date: string;
    messages: MessageInterface[];
  }[];
  conversation: ConversationInterface;
  setConversation: React.Dispatch<React.SetStateAction<ConversationInterface>>;
  setConversations: React.Dispatch<
    React.SetStateAction<ConversationInterface[]>
  >;
  activeDisplay:
    | 'conversations'
    | 'status'
    | 'archived-conversations'
    | 'settings'
    | 'profile';
  setActiveDisplay: (
    display:
      | 'conversations'
      | 'status'
      | 'archived-conversations'
      | 'settings'
      | 'profile',
  ) => void;
  handleLogin: (data: LoginInterface) => void;
}
