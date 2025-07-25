import axios from 'axios';
import React from 'react'
import { url } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user,onAction,isOnEdit}) => {
  const {_id,firstName,lastName,age,about,gender,photoUrl}=user;
  const dispatch = useDispatch();

  const handleSendRequest=async(status,_id)=>{

    try {
        await axios.post(
        url+'/request/send/'+status+'/'+_id,
        {},
        {withCredentials:true}
       )
       dispatch(removeUserFromFeed(_id));
       if(onAction) {
         onAction();
       }
    } catch (error) {
      console.log(error)
    }
  }
  return (
        <div className="card bg-gray-900 w-96 h-150  shadow-sm">
        <figure>
            <img
            src={photoUrl}
            alt="img"
             className=''/>
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName +" "+lastName}</h2>
            <p className=''>{age + " , "+ gender}</p>
            <p className=''>{about}</p>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={()=> isOnEdit? null :handleSendRequest("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=> isOnEdit? null :handleSendRequest("interested",_id)}>Interested</button>
            </div>
        </div>
        </div>
  )
}

export default UserCard
