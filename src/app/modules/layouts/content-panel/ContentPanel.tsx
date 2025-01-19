import React, { useContext, useEffect, useState } from 'react';
import './ContentPanel.scss';
import ChatWindow from '../../components/chat-window/ChatWindow';
import { Context } from '../../auth/AuthContext';
import { handleIsConversationValid } from '../../helpers/validators';

const ContentPanel = () => {
  const { conversation, user } = useContext(Context);
  const [isValidConversation, setIsValidConversation] =
    useState<boolean>(false);

  useEffect(() => {
    setIsValidConversation(handleIsConversationValid(conversation));
  }, [conversation]);
  return (
    <div
      className={`content-panel ${!isValidConversation ? 'hidden-element-1024' : ''}`}
    >
      {isValidConversation ? (
        <ChatWindow />
      ) : (
        <div className="content-panel-content">
          <p className="content-panel-title">Chat Web</p>
          <p className="content-panel-text">
            Envie e receba mensagens em tempo real com o{' '}
            <strong>Chat Web</strong>, é grátis e simples de usar
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentPanel;
