import React, { useContext, useEffect, useState } from 'react';
import './SetDisplay.scss';
import { Context } from '../../auth/AuthContext';
import Conversations from '../../components/conversations/Conversations';
import { handleIsConversationValid } from '../../helpers/Validators';
import ToolsBar from '../toolsbar/ToolsBar';
import Profile from '../../components/profile/Profile';

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
      <ToolsBar />

      {activeDisplay === 'conversations' ? <Conversations /> : <Profile />}
    </div>
  );
};

export default SetDisplay;
