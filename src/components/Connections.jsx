import axios from 'axios'
import React, { useEffect } from 'react'
import { url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store=>store.Connections)
    const fetchConnections = async()=>{
      const res =await axios.get (
        url+'/user/connections',
        {
        withCredentials:true
        }
    )
    dispatch(addConnections(res.data.data))
    }

    useEffect(()=>{
        fetchConnections();
    },[])
 
    if(!connections) return
    if(connections.length ===0){
        return (
            <h1>You have no connections !!!</h1>
        )
    }
  return (
    <div>
      {connections.map((connection) =>{
        const{firstName,lastName,photoUrl,age,gender,_id}=connection;
        
        return (
            
        <div key={_id} className=" flex flex-col items-center justify-center ">
        <div className="flex flex-col justify-center w-full md:w-1/2 p-4">
        <div className="flex items-center  gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-md hover:shadow-xl   hover:scale-[1.02] transition-transform duration-300">
            
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
            <img
                alt="profile"
                src={photoUrl}
                className="w-full h-full object-cover"
            />
            </div>

            <div>
            <h1 className="text-lg font-semibold text-white">{firstName + ' ' + lastName}</h1>
            <p className="text-sm text-gray-300">{age + ', ' + gender}</p>
            </div>

        </div>
        </div>
        </div>
        )
      } )}
    </div>
  )
}

export default Connections
