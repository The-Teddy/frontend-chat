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

interface MessageDataInterface {
  message: MessageInterface;
  setView: () => void;
  setData: (
    data: MessageInterface,
    position: { clientX: number; clientY: number },
  ) => void;
  key: number;
}
const Message: React.FC<MessageDataInterface> = ({ ...props }) => {
  const { user } = useContext(Context);
  const [messageTime, setMessageTime] = useState<string>('');
  const [viewMessageButton, setViewMessageButton] = useState<boolean>(false);

  function handleSetMessageTime(): void {
    if (props.message.sentAt) {
      const messageTime = handleMessageTime(props.message.sentAt);
      setMessageTime(messageTime);
    }
  }

  useEffect(() => {
    handleSetMessageTime();
  }, [props.message]);

  function handleOpenModalByContextMenu(
    event: React.MouseEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    props.setData(props.message, {
      clientX: event.clientX,
      clientY: event.clientY,
    });
    props.setView();
  }

  function handleViewModal(event: React.MouseEvent<HTMLButtonElement>) {
    props.setData(props.message, {
      clientX: event.clientX,
      clientY: event.clientY,
    });
    props.setView();
  }

  return (
    <div
      onMouseEnter={() => setViewMessageButton(true)}
      onMouseLeave={() => setViewMessageButton(false)}
      id="message"
      key={props.key}
      style={{
        flexFlow: props.message.sender === user?.email ? 'row-reverse' : 'row',
      }}
    >
      <div
        className="message-content"
        style={{
          background: props.message.sender === user?.email ? '#f2f2f2' : '',
        }}
        onContextMenu={(event) => handleOpenModalByContextMenu(event)}
        id={`message-${props.message.id}`}
      >
        <span className="message-text">
          {props.message.message}

          <div className="message-time-status">
            <span className="secondary-color">{messageTime}</span>
            <span className="secondary-color">
              {props.message.sender === user?.email ? (
                props.message.status === 'read' ? (
                  <ReadIcon />
                ) : props.message.status === 'delivered' ? (
                  <DeliveredIcon />
                ) : (
                  <SentIcon />
                )
              ) : null}
            </span>
          </div>
        </span>
      </div>
      {viewMessageButton ? (
        <button className="message-button" onClick={handleViewModal}>
          <FontAwesomeIcon
            id="message-icon"
            icon={faChevronDown}
            color={props.message.sender === user?.email ? '#f2f2f2' : '#fff'}
          />
        </button>
      ) : null}
    </div>
  );
};

export default Message;
