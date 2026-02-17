import './App.css';
import Login from './Pages/Login/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OtpHandler from './Pages/Otp/OtpHandler';

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element:<Login />
  },
{
    path: '/otp/:id',
    element:<OtpHandler />
  }])

  return (
    <RouterProvider router = {router}/>
  );
}

export default App;
