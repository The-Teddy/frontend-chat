import './Home.scss';
import ContentPanel from '../../layouts/content-panel/ContentPanel';
import SetDisplay from '../../layouts/set-display/SetDisplay';

const Home = () => {
  return (
    <div id="chat">
      <SetDisplay />
      <ContentPanel />
    </div>
  );
};

export default Home;
