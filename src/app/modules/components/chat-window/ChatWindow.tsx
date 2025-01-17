import React, { useContext, useState } from 'react';
import './ChatWindow.css';
import TopBarChat from '../../layouts/topbar-chat/TopBarChat';
import BottomBarChat from '../../layouts/bottombar-chat/BottomBarChat';
import { Context } from '../../auth/AuthContext';
import Message from '../message/Message';
import { Load } from '../spinner/Spinner';
import { MessageInterface } from '../../global/interfaces/MessageInterface';
import DynamicModal from '../modals/dynamic-modal/DynamicModal';
import { handleModalPosition } from '../../helpers/utils';

const ChatWindow = () => {
  const { conversation, setConversation, setConversations, user } =
    useContext(Context);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<{
    message: MessageInterface;
    position: {
      x: number;
      y: number;
    };
  } | null>(null);
  const [messageData, setMessageData] = useState<MessageInterface>();
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [settingModal, setSettingModal] = useState<{
    y: number;
    x: number;
  } | null>(null);

  // useEffect(() => {
  //   setLoadingMessages(true);
  //   setTimeout(() => {
  //     setLoadingMessages(false);
  //   }, 1000);
  // }, [conversation]);

  function handleViewMessageModal(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;

    if (
      target.id !== 'message-icon' &&
      target.parentElement?.id !== 'message-icon' &&
      !target.classList?.contains('message-button') &&
      !target.classList.contains('modal-message-button')
    ) {
      setViewModal(false);
    }
  }

  function handleSettingModal(position: { clientX: number; clientY: number }) {
    const positionModal = handleModalPosition(
      position,
      '#chat-window #dynamic-modal',
    );

    setSettingModal(positionModal);
    setViewModal(true);
  }

  return (
    <div
      id="chat-window"
      onClick={handleViewMessageModal}
      onKeyDown={(e) => (e.key === 'Escape' ? handleViewMessageModal : '')}
    >
      <TopBarChat />

      <div id="messages">
        {loadingMessages ? (
          <Load />
        ) : (
          <>
            {conversation.messages.length > 0 ? (
              conversation.messages.map((item, index) => (
                <Message
                  key={index}
                  message={item}
                  setData={(message, position) => {
                    setMessageData(message);
                    handleSettingModal(position);
                  }}
                  setView={() => setViewModal(true)}
                />
              ))
            ) : (
              <p>Não há mensagens para serem exibidas</p>
            )}
          </>
        )}
      </div>
      <BottomBarChat conversation={conversation} />
      <DynamicModal settingModal={settingModal} view={viewModal}>
        <button
          onClick={() => alert('Dados da mensagem')}
          className="modal-message-button secondary-color"
        >
          Dados da Mensagem
        </button>
        <button className="modal-message-button secondary-color">
          Responder
        </button>
        <button className="modal-message-button secondary-color">Reagir</button>
        <button className="modal-message-button secondary-color">
          Encaminhar
        </button>
        <button className="modal-message-button secondary-color">Fixar</button>
        <button className="modal-message-button secondary-color">
          Favoritar
        </button>
        <button className="modal-message-button secondary-color">Apagar</button>
      </DynamicModal>
    </div>
  );
};

export default ChatWindow;
