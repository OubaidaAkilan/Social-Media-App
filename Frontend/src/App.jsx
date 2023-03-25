import {
  // createBrowserRouter,
  // Navigate,
  Outlet,
  // RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftbar/LeftBar';
import RightBar from './components/rightbar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
  const Layout = () => {
    return (
      <section>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </section>
    );
  };
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );

  // const currentUser = true;
  // const ProtectedRoutes = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to='login' />;
  //   }
  //   return children;
  // };

  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: (
  //       <ProtectedRoutes>
  //         <Layout />
  //       </ProtectedRoutes>
  //     ),
  //     children: [
  //       { path: '/', element: <Home /> },
  //       { path: '/profile/:id', element: <Profile /> },
  //     ],
  //   },
  //   {
  //     path: '/login',
  //     element: <Login />,
  //   },
  //   {
  //     path: '/register',
  //     element: <Register />,
  //   },
  // ]);

  // return <RouterProvider router={router} />;
}

export default App;
