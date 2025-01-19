import React, { useContext } from 'react';
import './ToolsBar.scss';
import { Context } from '../../auth/AuthContext';
import Conversation from '../../components/conversation/Conversation';
import ConversationIcon from '../../components/icons/ConversationIcon';
import StatusIcon from '../../components/icons/StatusIcon';
import ArchivedConversationsIcon from '../../components/icons/ArchivedConversationsIcon';
import SettingsIcon from '../../components/icons/SettingsIcon';

const ToolsBar: React.FC = () => {
  const { setConversation, setActiveDisplay, activeDisplay } =
    useContext(Context);

  function handleCloseChatWindow(
    display:
      | 'conversations'
      | 'status'
      | 'archived-conversations'
      | 'settings'
      | 'profile',
  ) {
    setActiveDisplay(display);

    if (window.innerWidth <= 1024) {
      setConversation({
        name: '',
        pathImage: '',
        date: '',
        messages: [],
      });
    }
  }

  return (
    <nav id="sidebar">
      <section className="side-items">
        <button
          title="Conversas"
          className={`side-item ${activeDisplay === 'conversations' ? 'active-item' : ''}`}
          onClick={() => handleCloseChatWindow('conversations')}
        >
          <ConversationIcon />
        </button>
        <button
          title="Status"
          className={`side-item ${activeDisplay === 'status' ? 'active-item' : ''}`}
          onClick={() => handleCloseChatWindow('status')}
        >
          <StatusIcon />
        </button>
        {/* <button
          title="Conversas Arquivadas"
          className={`side-item ${activeDisplay === 'archived-conversations' ? 'active-item' : ''}`}
          onClick={() => handleCloseChatWindow('archived-conversations')}
        >
          <ArchivedConversationsIcon />
        </button> */}
        <button
          title="Configurações"
          className={`side-item ${activeDisplay === 'settings' ? 'active-item' : ''}`}
          onClick={() => handleCloseChatWindow('settings')}
        >
          <SettingsIcon />
        </button>
      </section>
      <div
        className={`box-image  ${activeDisplay === 'profile' ? 'active-item' : ''}`}
        role="button"
        onClick={() => handleCloseChatWindow('profile')}
      >
        <img src="/images/file.jpeg" alt="" />
      </div>
    </nav>
  );
};

export default ToolsBar;
