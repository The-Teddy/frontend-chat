import { AuthContextType } from './Interfaces';

export const defaultContextValue: AuthContextType = {
  user: null,
  token: '',
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
  handleLogout: () => {},
};
