import { AuthContextType } from './Interfaces';

export const defaultContextValue: AuthContextType = {
  user: null,
  token: '',
  isAuthenticated: false,
  loading: false,
  conversations: [
    {
      pathImage: '',
      name: '',
      date: '',
      messages: [],
    },
  ],
  conversation: {
    pathImage: '',
    name: '',
    date: '',
    messages: [],
  },
  setConversation: () => {},
  setConversations: () => {},
  activeDisplay: 'conversations',
  setActiveDisplay: () => {},
  handleLogin: () => {},
};
