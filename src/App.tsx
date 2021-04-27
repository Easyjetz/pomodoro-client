import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { useRoutes } from './routes';
import 'materialize-css';
import { NavBar } from './features/navbar/components/NavBar';
import { useAuth } from './hooks/useAuth';
import { Container } from './ui';


function App() {

  const { loginResponse} = useAuth();
  const isAuthenticated = !!loginResponse?.token;

  const routes = useRoutes(isAuthenticated);


  return (
    <BrowserRouter>
      {isAuthenticated && <NavBar />}
      <Container>
        {routes}
      </Container>
    </BrowserRouter>
  );
}

export default App;
