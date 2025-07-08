import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { addRequests } from '../utils/requestsSlice';
import { url } from '../utils/constants';

export const useInitialData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  const location = useLocation();

  const userData = useSelector((store) => store.user);
  const requests = useSelector((store) => store.Requests);

  const [loading, setLoading] = useState(true);
      const fetchData = async () => {
      
      try {
        const [userRes, requestRes] = await Promise.all([
           axios.get(`${url}/profile/view`, { withCredentials: true }) ,
           axios.get(`${url}/user/request/recevied`, { withCredentials: true })
        ]);
         console.log("data fetched!!")
        dispatch(addUser(userRes.data));
       dispatch(addRequests(requestRes.data.connectionRequest));
     
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate('/login');
        }
        console.error('Initial data fetch error:', error);
      } finally {
        setLoading(false);
      }

    };

  useEffect(() => {
    // const publicRoutes = ['/login', '/signup']; 

    // if (publicRoutes.includes(location.pathname)) {
    //   setLoading(false);
    //   return;
    // }

    if(!userData || !requests){
         fetchData();
    }
    else {
      setLoading(false);
    }
  }, [dispatch, navigate, userData, requests]);

  return { loading };
};
