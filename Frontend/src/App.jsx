import { QueryClient, QueryClientProvider } from 'react-query';

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import './App.scss';
import { useContext } from 'react';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftbar/LeftBar';
import RightBar from './components/rightbar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

import { DarkModeContext } from './context/DarkModeContext';
import { AuthContext } from './context/AuthContext';

function App() {
  const queryClient = new QueryClient();
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <section className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <Navbar />
          <div className='main' style={{ display: 'flex' }}>
            <LeftBar />
            <Outlet />
            <RightBar />
          </div>
        </section>
      </QueryClientProvider>
    );
  };

  const ProtectedRoutes = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='login' />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/profile/:id', element: <Profile /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
