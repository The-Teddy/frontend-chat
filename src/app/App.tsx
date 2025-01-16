import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers/Routers';
import { AuthContext } from './modules/auth/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <main className="app">
      <BrowserRouter basename="/">
        <AuthContext>
          <Routers />
        </AuthContext>
        <ToastContainer autoClose={2500} />
      </BrowserRouter>
    </main>
  );
}

export default App;
