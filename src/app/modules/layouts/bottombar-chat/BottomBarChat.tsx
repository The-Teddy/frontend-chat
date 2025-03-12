import React, { useContext, useEffect, useRef, useState } from 'react';
import './BottomBarChat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faNoteSticky,
  faPaperclip,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { ConversationInterface } from '../../global/interfaces/ConversationInterface';
import { Context } from '../../auth/AuthContext';
import { handleSanitizeInput } from '../../helpers/utils/Utils';

interface conversationChatInterface {
  conversation: ConversationInterface | null;
}
const BottomBarChat: React.FC<conversationChatInterface> = ({ ...props }) => {
  const [typedText, setTypedText] = useState<string>('');
  const inputRef = useRef<HTMLDivElement>(null);
  const { conversation, setConversation, setConversations, user } =
    useContext(Context);

  function handleReset(): void {
    if (inputRef.current) {
      inputRef.current.innerText = ''; // Reseta o conteúdo para vazio
      inputRef.current.innerHTML = '';
    }
  }

  function handleSendMessage(): void {
    if (user) {
      setConversation((prevState: ConversationInterface) => ({
        ...prevState,
        messages: [
          {
            id: 15,
            sender: user.email,
            message: inputRef.current?.innerText.trim() || '',
            sentAt: new Date(),
            deliveredAt: null,
            readAt: null,
            status: 'sent',
          },
          ...prevState.messages,
        ],
      }));
      setConversations((prevConversations) => {
        return prevConversations.map((conv) =>
          conv.id === conversation.id
            ? {
                ...conv,
                messages: [
                  {
                    id: 15,
                    sender: user.email,
                    message: inputRef.current?.innerText.trim() || '',
                    sentAt: new Date(),
                    deliveredAt: null,
                    readAt: null,
                    status: 'sent',
                  },
                  ...conv.messages,
                ],
              }
            : conv,
        );
      });
    }
  }

  function handleValidateMessage(
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (typedText.trim()) {
        handleSendMessage();
      }
    }
  }
  useEffect(() => {
    handleReset();
    inputRef.current?.focus();
  }, [props.conversation]);

  return (
    <footer id="bottombar-chat" className="bottombar-chat">
      <div className="bottombar-chat__content">
        <button className="attach-files action-button">
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        <div className="type-box">
          <button title="Figurinhas" className="stickers-button">
            <FontAwesomeIcon icon={faNoteSticky} />
          </button>
          <div
            role="textbox"
            id="input-text"
            contentEditable="true"
            className="primary-color"
            onInput={(e) =>
              setTypedText(handleSanitizeInput(e.currentTarget.innerText))
            }
            ref={inputRef}
            onKeyDown={handleValidateMessage}
          ></div>
        </div>
        <div className="actions-box">
          <button className="record-audio action-button">
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          <button
            className="send-message action-button"
            onClick={handleSendMessage}
            disabled={handleSanitizeInput(typedText) === ''}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default BottomBarChat;
