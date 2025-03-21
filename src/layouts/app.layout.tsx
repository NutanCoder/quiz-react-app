import { Outlet } from 'react-router-dom';
import Navbar from '@/layouts/navbar';
import Footer from '@/layouts/footer';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
