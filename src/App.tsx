import { RouterProvider } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth, setUser } from '@/redux/auth.slice';
import { authService } from '@/features/auth/services';
import { routes } from '@/constants';
import { fetchProfile, setProfile } from '@/redux/profile.slice';
import { AppDispatch } from '@/redux/store';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = useCallback(async () => {
    const { data } = await authService.getUser();
    if (data) {
      dispatch(setUser(data));
      dispatch(fetchProfile());
    } else {
      dispatch(clearAuth());
      dispatch(setProfile(null));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
