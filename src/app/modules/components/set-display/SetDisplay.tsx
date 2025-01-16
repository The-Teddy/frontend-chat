import React, { useContext, useEffect, useState } from 'react';
import './SetDisplay.scss';
import { Context } from '../../auth/AuthContext';
import Conversations from '../conversations/Conversations';
import { handleIsConversationValid } from '../../helpers/validators';

const SetDisplay = () => {
  const { activeDisplay, conversation } = useContext(Context);
  const [isValidConversation, setIsValidConversation] =
    useState<boolean>(false);

  useEffect(() => {
    setIsValidConversation(handleIsConversationValid(conversation));
  }, [conversation]);
  return (
    <div
      id="set-display"
      className={isValidConversation ? 'hidden-element-1024' : ''}
    >
      {activeDisplay === 'conversations' ? (
        <Conversations />
      ) : (
        <h1>Ta indo ainda kkkk</h1>
      )}
    </div>
  );
};

export default SetDisplay;
