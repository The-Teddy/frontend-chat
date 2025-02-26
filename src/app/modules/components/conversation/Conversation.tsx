import React, { useContext, useEffect, useState } from 'react';
import './Conversation.scss';
import { Context } from '../../auth/AuthContext';
import { ConversationInterface } from '../../global/interfaces/ConversationInterface';
import { MessageInterface } from '../../global/interfaces/MessageInterface';
import SentIcon from '../icons/SentIcon';
import DeliveredIcon from '../icons/DeliveredIcon';
import ReadIcon from '../icons/ReadIcon';
import { handleMessageTime } from '../../helpers/utils/Dates';
import { handleIsConversationValid } from '../../helpers/Validators';

interface Conversation {
  conversation: ConversationInterface;
}

const Conversation: React.FC<Conversation> = ({ ...props }) => {
  const { user, conversation } = useContext(Context);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [messageStatus, setMessageStatus] = useState<string>('');
  const [numberOfMessages, setNumberOfMessages] = useState<number>(0);
  const [lastMessage, setLastMessage] = useState<MessageInterface>();
  const [messageTime, setMessageTime] = useState<string>('');
  const [conversationProps, setConversationProps] =
    useState<ConversationInterface>();

  function handleFilterUnreadMessages(): void {
    const filteredMessages = conversationProps?.messages.filter((item) => {
      return item.sender !== user?.email && item.status !== 'read';
    });

    if (conversationProps && filteredMessages) {
      setUnreadMessages(filteredMessages.length);
    }
  }
  function handleSetStatus(): void {
    if (conversationProps?.messages[0]?.status === 'read') {
      setMessageStatus('read');
    } else if (conversationProps?.messages[0]?.status === 'delivered') {
      setMessageStatus('delivered');
    } else {
      setMessageStatus('sent');
    }
  }
  function handleSetMessageTime(): void {
    if (conversationProps?.messages[0]?.sentAt) {
      const messageTime = handleMessageTime(
        conversationProps.messages[0]?.sentAt,
      );
      setMessageTime(messageTime);
    }
  }

  useEffect(() => {
    setConversationProps(props.conversation);
  }, [props.conversation]);

  useEffect(() => {
    if (conversationProps?.id === conversation.id) {
      setUnreadMessages(0);
    }
    if (conversationProps) {
      setNumberOfMessages(conversationProps.messages.length);
      handleFilterUnreadMessages();
      handleSetStatus();
      handleSetMessageTime();
    }
  }, [conversationProps]);

  useEffect(() => {
    if (!conversationProps && !handleIsConversationValid(conversation)) return;
    if (conversationProps?.id === conversation.id) {
      setConversationProps(conversation);
      setUnreadMessages(0);
    }
  }, [conversation]);

  return (
    <div id="conversation" role="button">
      <div className="image-box">
        <img
          src={`/images/${props.conversation.pathImage}`}
          alt={props.conversation.name}
          loading="lazy"
        />
      </div>
      <div className="data-conversation">
        <div className="name-box">
          <p className="user-name">{props.conversation.name}</p>
          <span className="date secondary-color">{messageTime}</span>
        </div>
        <div className="last-message-box">
          <span className="last-message">
            {props.conversation.messages[0].message?.split('', 30)}{' '}
            {props.conversation.messages[0]?.message.length >= 30 ? '...' : ''}
          </span>
          {numberOfMessages > 0 ? (
            <span style={{ marginLeft: 'auto' }}>
              {props.conversation.messages[0].sender === user?.email ? (
                messageStatus === 'read' ? (
                  <ReadIcon />
                ) : messageStatus === 'delivered' ? (
                  <DeliveredIcon />
                ) : (
                  <SentIcon />
                )
              ) : null}
            </span>
          ) : null}
          {unreadMessages > 0 ? (
            <div className="unread-length">{unreadMessages}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Conversation;
