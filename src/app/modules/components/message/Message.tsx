import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageInterface } from '../../global/interfaces/MessageInterface';
import './Message.scss';
import { Context } from '../../auth/AuthContext';
import ReadIcon from '../icons/ReadIcon';
import DeliveredIcon from '../icons/DeliveredIcon';
import SentIcon from '../icons/SentIcon';
import { handleMessageTime } from '../../helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import MessageDataModal from '../modals/message-data-modal/MessageDataModal';

const Message: React.FC<MessageInterface> = ({ ...props }) => {
  const { user } = useContext(Context);
  const [messageTime, setMessageTime] = useState<string>('');
  const [viewMessageButton, setViewMessageButton] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const modalRef = useRef();

  function handleSetMessageTime(): void {
    if (props.sentAt) {
      const messageTime = handleMessageTime(props.sentAt);
      setMessageTime(messageTime);
    }
  }

  useEffect(() => {
    handleSetMessageTime();
  }, [props.message]);

  function handleOpenModal(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLDivElement;
    const messageDiv = target.parentElement?.parentElement;
    if (!messageDiv) return;

    const rect = messageDiv.getBoundingClientRect();
    console.log(rect);

    // Verifica o espaço disponível
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = window.innerWidth - rect.right;

    // Determina a posição do modal
    const position = {
      top:
        spaceBelow > 150
          ? rect.bottom + window.scrollY
          : rect.top - 150 + window.scrollY,
      left: spaceRight > 150 ? rect.right : rect.left - 150,
    };

    setModalPosition(position);
  }
  function handleOpenModalByContextMenu(
    event: React.MouseEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <div id="message" key={props.key}>
      <div
        className="message-content"
        style={{
          marginLeft: props.sender === user?.email ? 'auto' : '0',
          background: props.sender === user?.email ? '#f2f2f2' : '',
        }}
        onMouseEnter={() => setViewMessageButton(true)}
        onMouseLeave={() => setViewMessageButton(false)}
        onContextMenu={handleOpenModalByContextMenu}
      >
        <span className="message-text">
          {props.message}

          <div className="message-time-status">
            <span className="secondary-color">{messageTime}</span>
            <span className="secondary-color">
              {props.sender === user?.email ? (
                props.status === 'read' ? (
                  <ReadIcon />
                ) : props.status === 'delivered' ? (
                  <DeliveredIcon />
                ) : (
                  <SentIcon />
                )
              ) : null}
            </span>
          </div>
        </span>
        {viewMessageButton ? (
          <button className="message-button" onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faChevronDown} color="#6959cd" />
          </button>
        ) : null}
      </div>
      <MessageDataModal modalPosition={modalPosition} />
    </div>
  );
};

export default Message;
