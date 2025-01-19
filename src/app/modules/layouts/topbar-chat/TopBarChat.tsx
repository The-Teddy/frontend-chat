import React, { useContext } from 'react';
import './TopBarChat.scss';
import { Context } from '../../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '../../components/icons/SearchIcon';
import MenuIcon from '../../components/icons/MenuIcon';
import { initialConversation } from '../../global/vars';

const TopBarChat = () => {
  const { conversation, user, setConversation } = useContext(Context);

  return (
    <header id="top-bar-chat" className="top-bar-chat">
      <div className="top-bar-chat-content">
        <div className="box-name-image">
          <button
            title="Fechar conversa"
            className="back-button-chat"
            onClick={() => setConversation(initialConversation)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div role="button">
            <img
              src={`/images/${conversation?.pathImage}`}
              alt={conversation?.name}
              loading="lazy"
            />
            <span className="name">{conversation?.name}</span>
          </div>
        </div>
        <div className="box-tools">
          <SearchIcon />
          <MenuIcon />
        </div>
      </div>
    </header>
  );
};

export default TopBarChat;
