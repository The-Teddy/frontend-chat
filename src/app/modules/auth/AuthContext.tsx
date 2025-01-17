import React, { createContext, useEffect, useState } from 'react';
import { UserModel } from '../global/interfaces/UserModel';
import moment from 'moment';
import { MessageInterface } from '../global/interfaces/MessageInterface';
import { ConversationInterface } from '../global/interfaces/ConversationInterface';

interface AuthContextType {
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
  // mousePosition: { x: number; y: number } | null;
  // handleMousePosition: (
  //   event: React.MouseEvent<HTMLDivElement>,
  //   width: number,
  //   height: number,
  // ) => void;
}
const defaultContextValue: AuthContextType = {
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
  // mousePosition: null,
  // handleMousePosition: () => {},
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const Context = createContext<AuthContextType>(defaultContextValue);

const AuthContext: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>({
    name: 'Marcio Santos',
    email: 'marcio@gmail.com',
    role: 'user',
    emailVerified: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

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

      name: 'Lucas Meireles',
      pathImage: 'lucas.jpg',
      date: '13:54',

      messages: [
        {
          id: 7,
          sender: 'marcio@gmail.com',
          message: 'Com certeza! Só me lembra o lugar depois.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: null,
          status: 'delivered',
        },
        {
          id: 8,
          sender: 'lucas@gmail.com',
          message: 'Boa! Tá pronto pro happy hour mais tarde?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment(moment('2025-01-10T15:00:10Z').toDate()).toDate(),
          status: 'read',
        },
        {
          id: 9,
          sender: 'marcio@gmail.com',
          message: 'Sim, deu um trabalhinho, mas agora tá rodando.',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment(moment('2025-01-10T15:00:10Z').toDate()).toDate(),
          status: 'read',
        },
        {
          id: 10,
          sender: 'lucas@gmail.com',
          message: 'Também. Conseguiu resolver aquele bug?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 11,
          sender: 'marcio@gmail.com',
          message: 'Tudo certo, e contigo?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
        {
          id: 12,
          sender: 'lucas@gmail.com',
          message: 'E aí, Márcio! Tudo certo?',
          sentAt: moment('2025-01-10T15:00:00Z').toDate(),
          deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
          readAt: moment('2025-01-10T15:00:10Z').toDate(),
          status: 'read',
        },
      ],
    },
    // },
    // {
    //   id: 3,

    //   name: 'Welyson Oliveira',
    //   pathImage: 'welyson.jpeg',
    //   date: '13:22',

    //   messages: [
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Valeu pela dica, sempre atento às novidades. 👍',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'welyson@gmail.com',
    //       message: 'Recomendo, dá pra integrar com várias coisas. 😊',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Parece interessante, vou dar uma olhada depois.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'welyson@gmail.com',
    //       message: 'Chama Astro, é pra sites estáticos. Bem promissor!',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Ainda não, qual é?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'welyson@gmail.com',
    //       message: 'Fala, Márcio! Já viu o novo framework que saiu?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 4,

    //   name: 'Jefferson Gustavo',
    //   pathImage: 'jefferson.jpeg',
    //   date: '09:34',

    //   messages: [
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Qualquer coisa, só chamar. 😉',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: null,
    //       readAt: null,
    //       status: 'sent',
    //     },
    //     {
    //       sender: 'jefferson@gmail.com',
    //       message: 'Boa ideia, vou conferir agora. Valeu!',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Já verificou os logs? Pode ser algo no backend.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'jefferson@gmail.com',
    //       message: 'Meu sistema está travando quando faço uma requisição.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Bom dia! Claro, o que houve?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'jefferson@gmail.com',
    //       message: 'Bom dia, Márcio! Preciso de ajuda com um problema.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 5,

    //   name: 'Fabio Silveira',
    //   pathImage: 'fabio.jpeg',
    //   date: 'segunda-feira',

    //   messages: [
    //     {
    //       sender: 'fabio@gmail.com',
    //       message: 'Beleza, só não some! 😂',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Vou ver se consigo terminar mais cedo, te aviso.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'fabio@gmail.com',
    //       message: 'Que isso, cara! Um jogo só pra descontrair.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Hoje acho que não vai dar, tô cheio de trabalho.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'fabio@gmail.com',
    //       message: 'Márcio, bora jogar mais tarde?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 6,

    //   name: 'Walquiria Rangel',
    //   pathImage: 'wal.jpeg',
    //   date: 'sábado',

    //   messages: [
    //     {
    //       sender: 'walquiria@gmail.com',
    //       message: 'Boa! Se precisar de algo, só falar.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Tá fluindo bem, mas ainda tem muito pra fazer.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'walquiria@gmail.com',
    //       message: 'Bem também. Como tá aquele projeto que você comentou?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Oi, Wal! Tudo ótimo, e você?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'walquiria@gmail.com',
    //       message: 'Oi, Márcio! Tudo bem?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 7,

    //   name: 'Welighton Junior',
    //   pathImage: 'welighton.jpg',
    //   date: 'sábado',

    //   messages: [
    //     {
    //       sender: 'welighton@gmail.com',
    //       message: 'Perfeito! Te chamo no horário combinado.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: null,
    //       status: 'delivered',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Claro, amanhã de tarde tá bom pra você?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'welighton@gmail.com',
    //       message: 'Que ótimo! Vamos marcar uma call pra alinhar os detalhes?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Sim, parece promissora. Dá pra avançar com o MVP.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'welighton@gmail.com',
    //       message: 'E aí, Márcio! Conseguiu ver minha ideia?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 8,

    //   name: 'Robson Felix',
    //   pathImage: 'robson.jpeg',
    //   date: 'sábado',

    //   messages: [
    //     {
    //       sender: 'robson@gmail.com',
    //       message: 'Valeu, Márcio! Tô aqui se precisar de ajuda.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Assim que eu olhar, te dou um feedback. 😉',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'robson@gmail.com',
    //       message: 'Tá bom, sem pressa! Só queria saber se você achou confuso.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Ainda não, Robson. Mas vou ver hoje à noite, prometo.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'robson@gmail.com',
    //       message:
    //         'Oi Márcio! Você já deu uma olhada na documentação que te mandei?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 9,

    //   name: 'Mauricio Henrique',
    //   pathImage: 'mauricio.jpeg',
    //   date: 'sábado',

    //   messages: [
    //     {
    //       sender: 'mauricio@gmail.com',
    //       message: 'Até mais, mano',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: null,
    //       status: 'delivered',
    //     },
    //     {
    //       sender: 'mauricio@gmail.com',
    //       message: 'Fico no aguardo. 🚀',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: null,
    //       status: 'delivered',
    //     },
    //     {
    //       sender: 'mauricio@gmail.com',
    //       message: 'Show! mano 🚀',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: null,
    //       status: 'delivered',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message:
    //         'Valeu, Maurício! Vou te avisar assim que tiver algo pronto pra validar.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'mauricio@gmail.com',
    //       message: 'Imagino. Se precisar de algum teste, posso ajudar!',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message:
    //         'Bom dia! Tá indo bem, mas ainda tem bastante coisa pra ajustar.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'mauricio@gmail.com',
    //       message: 'Bom dia, Márcio! Como tá indo o projeto novo?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:10Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
    // {
    //   id: 10,

    //   name: 'Walquiria Rangel',
    //   pathImage: 'wal.jpeg',
    //   date: 'sexta',

    //   messages: [
    //     {
    //       sender: 'walquiria@gmail.com',
    //       message: 'Combinado! 😊',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message: 'Beleza! Já já te envio um update.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'walquiria@gmail.com',
    //       message: 'Obrigada! Qualquer dúvida, é só me chamar.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'marcio@gmail.com',
    //       message:
    //         'Bom dia, Walquiria! Claro, vou priorizar isso agora de manhã.',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       status: 'read',
    //     },
    //     {
    //       sender: 'walquiria@gmail.com',
    //       message:
    //         'Bom dia, Márcio! Consegue me enviar o relatório até o final do dia?',
    //       sentAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       deliveredAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       readAt: moment('2025-01-10T15:00:00Z').toDate(),
    //       status: 'read',
    //     },
    //   ],
    // },
  ]);

  function handleLogin(email: string, password: string) {}
  function handleLogout() {}
  function handleGetUser() {}

  // useEffect(() => {
  //   document.addEventListener('mousemove', handleMouseMove);
  // }, []);

  return (
    <Context.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        conversations,
        conversation,
        setConversation,
        setConversations,
        activeDisplay,
        setActiveDisplay,
        // mousePosition,
        // handleMousePosition,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AuthContext, Context };
