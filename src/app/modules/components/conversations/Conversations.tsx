import React, { useContext } from 'react';
import './Conversations.scss';
import Conversation from '../conversation/Conversation';
import { Context } from '../../auth/AuthContext';
import MenuIcon from '../icons/MenuIcon';
import { ConversationInterface } from '../../global/interfaces/ConversationInterface';

const Conversations: React.FC = () => {
  const {
    conversations,
    setConversation,
    setConversations,
    user,
    conversation,
  } = useContext(Context);

  function handleMarkMessageAsRead(): void {
    setConversation((prevState: ConversationInterface) => ({
      ...prevState,
      messages: prevState.messages.map((message) =>
        message.sender !== user?.email
          ? { ...message, readAt: new Date(), status: 'read' }
          : message,
      ),
    }));
    setConversations((prevConversations) => {
      return prevConversations.map((conv) =>
        conv.id === conversation.id
          ? {
              ...conv,
              messages: conv.messages.map((message) =>
                message.sender !== user?.email && !message.readAt
                  ? { ...message, readAt: new Date(), status: 'read' }
                  : message,
              ),
            }
          : conv,
      );
    });
  }

  return (
    <div id="conversations" className="default-padding-top">
      <div className="top-bar-conversations">
        <div className="title-box">
          <h1 className="title">Conversas</h1>
          <button title="Menu" className="button-menu">
            <MenuIcon />
          </button>
        </div>
        <div className="filter-box">
          <input type="text" className="input-search" placeholder="Pesquisar" />
        </div>
      </div>
      <div className="conversations">
        {conversations.length > 0 ? (
          conversations.map((item, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                setConversation(item);
                handleMarkMessageAsRead();
              }}
            >
              <Conversation conversation={item} />
            </div>
          ))
        ) : (
          <p>Não há conversas</p>
        )}
      </div>
    </div>
  );
};

export default Conversations;
