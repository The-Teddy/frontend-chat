import React, { createContext, useEffect, useState } from 'react';
import { LoginInterface, UserModel } from '../global/interfaces/UserModel';
import moment from 'moment';
import { ConversationInterface } from '../global/interfaces/ConversationInterface';
import { toast } from 'react-toastify';
import { login } from '../helpers/api/AuthEndpoints';

import { handleError } from '../helpers/utils/Requests';
import { AuthContextType } from './Interfaces';
import { defaultContextValue } from './Defaults';

interface AuthProviderProps {
  children: React.ReactNode;
}

const Context = createContext<AuthContextType>(defaultContextValue);

const AuthContext: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const [conversation, setConversation] = useState<ConversationInterface>({
    pathImage: '',
    name: '',
    date: '',
    messages: [],
  });
  const [activeDisplay, setActiveDisplay] = useState<
    | 'conversations'
    | 'status'
    | 'archived-conversations'
    | 'settings'
    | 'profile'
  >('conversations');

  const [conversations, setConversations] = useState<ConversationInterface[]>([
    {
      id: 1,
      name: 'Giselly Santos',
      pathImage: 'giselly.jpeg',
      date: '14:33',

      messages: [
        {
          id: 1,
          sender: 'marcio@gmail.com',
          message: 'Você é incrível, obrigado. 😘',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: null,
          readAt: null,
          status: 'sent',
        },
        {
          id: 2,
          sender: 'giselly@gmail.com',
          message: 'Claro, faço um prato pra você e trago na mesa. 😊',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 3,
          sender: 'marcio@gmail.com',
          message: 'Provavelmente, mas me avisa quando estiver pronto?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 4,
          sender: 'giselly@gmail.com',
          message: 'To terminando o almoço, você vai almoçar tarde?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 5,
          sender: 'marcio@gmail.com',
          message: 'Oi! Está tranquilo, e você?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:00Z').toDate(),
          status: 'read',
        },

        {
          id: 6,
          sender: 'giselly@gmail.com',
          message: 'Oi amor',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
      ],
    },
    {
      id: 2,

      name: 'Welighton Junior',
      pathImage: 'welighton.jpg',
      date: '13:54',

      messages: [
        {
          id: 7,
          sender: 'welighton@gmail.com',
          message: 'Perfeito! Te chamo no horário combinado.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: null,
          status: 'delivered',
        },
        {
          id: 8,
          sender: 'marcio@gmail.com',
          message: 'Claro, amanhã de tarde tá bom pra você?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 9,
          sender: 'welighton@gmail.com',
          message: 'Que ótimo! Vamos marcar uma call pra alinhar os detalhes?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 10,
          sender: 'marcio@gmail.com',
          message: 'Sim, parece promissora. Dá pra avançar com o MVP.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 11,
          sender: 'welighton@gmail.com',
          message: 'E aí, Márcio! Conseguiu ver minha ideia?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
      ],
    },

    {
      id: 3,

      name: 'Welyson Oliveira',
      pathImage: 'welyson.jpeg',
      date: '13:22',

      messages: [
        {
          id: 13,
          sender: 'marcio@gmail.com',
          message: 'Valeu pela dica, sempre atento às novidades. 👍',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 14,
          sender: 'welyson@gmail.com',
          message: 'Recomendo, dá pra integrar com várias coisas. 😊',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 15,
          sender: 'marcio@gmail.com',
          message: 'Parece interessante, vou dar uma olhada depois.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 16,
          sender: 'welyson@gmail.com',
          message: 'Chama Astro, é pra sites estáticos. Bem promissor!',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 17,
          sender: 'marcio@gmail.com',
          message: 'Ainda não, qual é?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 18,
          sender: 'welyson@gmail.com',
          message: 'Fala, Márcio! Já viu o novo framework que saiu?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
      ],
    },

    {
      id: 9,

      name: 'Mauricio Henrique',
      pathImage: 'mauricio.jpeg',
      date: 'sábado',

      messages: [
        {
          id: 19,
          sender: 'mauricio@gmail.com',
          message: 'Até mais, mano',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: null,
          status: 'delivered',
        },
        {
          id: 20,
          sender: 'mauricio@gmail.com',
          message: 'Fico no aguardo. 🚀',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: null,
          status: 'delivered',
        },
        {
          id: 21,
          sender: 'mauricio@gmail.com',
          message: 'Show! mano 🚀',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: null,
          status: 'delivered',
        },
        {
          id: 22,
          sender: 'marcio@gmail.com',
          message:
            'Valeu, Maurício! Vou te avisar assim que tiver algo pronto pra validar.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 23,
          sender: 'mauricio@gmail.com',
          message: 'Imagino. Se precisar de algum teste, posso ajudar!',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 24,
          sender: 'marcio@gmail.com',
          message:
            'Bom dia! Tá indo bem, mas ainda tem bastante coisa pra ajustar.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 25,
          sender: 'mauricio@gmail.com',
          message: 'Bom dia, Márcio! Como tá indo o projeto novo?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
      ],
    },
  ]);

  function handleLogin(data: LoginInterface) {
    setLoading(true);
    login(data)
      .then((res) => {
        toast.success('Login efetuado com sucesso');
        setToken(res.data.access_token);
        setUser(res.data.data);
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('userData', JSON.stringify(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleLogout(): void {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setActiveDisplay('conversations');
  }
  // function handleGetUser() {}

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token') || '';
      const userData = localStorage.getItem('userData');

      setToken(storedToken);
      setUser(userData && JSON.parse(userData));
    } catch (error) {
      console.log(`Erro ao carregar os dados iniciais: ${error}`);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        token,
        loading,
        conversations,
        conversation,
        activeDisplay,
        setConversation,
        setConversations,
        setActiveDisplay,
        setUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AuthContext, Context };
