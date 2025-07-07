import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { addRequests } from '../utils/requestsSlice';
import { url } from '../utils/constants';

export const useInitialData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const requests = useSelector((store) => store.Requests);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, requestRes] = await Promise.all([
          !userData ? axios.get(`${url}/profile/view`, { withCredentials: true }) : Promise.resolve({ data: userData }),
          !requests ? axios.get(`${url}/user/request/recevied`, { withCredentials: true }) : Promise.resolve({ data: { connectionRequest: requests } })
        ]);

        if (!userData) dispatch(addUser(userRes.data));
        if (!requests) dispatch(addRequests(requestRes.data.connectionRequest));
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate('/login');
        }
        console.error('Initial data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate, userData, requests]);

  return { loading };
};
