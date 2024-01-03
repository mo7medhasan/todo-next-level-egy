import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import { SignInForm, SignUpForm } from "./components/AuthComponents";
import { AppProvider, useAppContext } from './AppProvider'
import LayoutAuth from './components/LayoutAuth';

function PrivateRoute({ children }) {
  const { user } = useAppContext();

  return (
    <Route
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Navigate to="/signin" replace state={{ from: location }} />
        )
      }
    />
  );
}
function App() {
  return (
    <AppProvider>
    <LayoutAuth>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<PrivateRoute><TodoList /></PrivateRoute>} />
      </Routes>
    </Router>
    </LayoutAuth>
  </AppProvider>
  );
}

export default App;
