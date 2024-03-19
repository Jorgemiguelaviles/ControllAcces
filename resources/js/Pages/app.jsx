import { UserProvider } from '../userContext'; // Importe o UserProvider
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useRoutes from './Routes/index';

function App() {
  const { routes } = useRoutes();

  return (
    <UserProvider> {/* Englobe o App com UserProvider */}
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
