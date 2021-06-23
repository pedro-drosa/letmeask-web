import {BrowserRouter, Route} from 'react-router-dom';

import {Home} from './pages/Home';
import { NewRoom } from "./pages/NewRoom";

import {AuthcontextProvider} from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthcontextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthcontextProvider>
    </BrowserRouter>
  );
}

export default App;
