import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { addRequests } from '../utils/requestsSlice';
import { url } from '../utils/constants';

export const useInitialData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const userData = useSelector((store) => store.user);
  // const requests = useSelector((store) => store.Requests);

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [userRes, requestRes] = await Promise.all([
         axios.get(`${url}/profile/view`, { withCredentials: true }),
         axios.get(`${url}/user/request/recevied`, { withCredentials: true })
      ]);
      
      dispatch(addUser(userRes.data));
      dispatch(addRequests(requestRes.data.connectionRequest));
      setIsAuthenticated(true);
     
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsAuthenticated(false);
        // Only navigate to login if not already on public routes
        const publicRoutes = ['/login', '/signup'];
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login');
        }
      }
      console.error('Initial data fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate, location.pathname]);

  useEffect(() => {
    const publicRoutes = ['/login', '/signup']; 

    // Skip data fetching for public routes
    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    // Always fetch data for protected routes
    // This ensures data is fetched after login
    fetchData();
  }, [location.pathname, fetchData]);

  // Expose refetch function for manual calls (like after login)
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { loading, refetch, isAuthenticated };
};