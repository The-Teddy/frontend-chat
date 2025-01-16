import React from 'react';
import './Home.scss';
import ToolsBar from '../../layouts/toolsbar/ToolsBar';
import Feed from '../../layouts/feed/Feed';
import SetDisplay from '../../components/set-display/SetDisplay';

const Home = () => {
  return (
    <div id="chat">
      <ToolsBar />
      <SetDisplay />
      <Feed />
    </div>
  );
};

export default Home;
