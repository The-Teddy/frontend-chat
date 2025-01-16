import React, { useContext, useEffect, useState } from 'react';
import './ChatWindow.css';
import TopBarChat from '../../layouts/topbar-chat/TopBarChat';
import BottomBarChat from '../../layouts/bottombar-chat/BottomBarChat';
import { Context } from '../../auth/AuthContext';
import Message from '../message/Message';
import { Load } from '../spinner/Spinner';
import { ConversationInterface } from '../../global/interfaces/ConversationInterface';

const ChatWindow = () => {
  const { conversation, setConversation, setConversations, user } =
    useContext(Context);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);

  useEffect(() => {
    setLoadingMessages(true);
    setTimeout(() => {
      setLoadingMessages(false);
    }, 1000);
  }, [conversation]);

  return (
    <div
      id="chat-window"
      // onKeyDown={(e) => (e.key === 'Escape' ? alert('testando') : '')}
    >
      <TopBarChat />

      <div className="messages">
        {loadingMessages ? (
          <Load />
        ) : (
          <>
            {conversation.messages.length > 0 ? (
              conversation.messages.map((item, index) => (
                <Message
                  key={index}
                  sender={item.sender}
                  message={item.message}
                  sentAt={item.sentAt}
                  deliveredAt={item.deliveredAt}
                  readAt={item.readAt}
                  status={item.status}
                />
              ))
            ) : (
              <p>Não há mensagens para serem exibidas</p>
            )}
          </>
        )}
      </div>
      <BottomBarChat conversation={conversation} />
    </div>
  );
};

export default ChatWindow;
