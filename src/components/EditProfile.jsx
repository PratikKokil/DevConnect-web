import React, {  useState } from 'react'
import InputField from './InputField';
import UserCard from './UserCard';
import axios from 'axios';
import { url } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
      const [firstName, setFirstName] = useState(user?.firstName);
      const [lastName, setLastName] = useState(user?.lastName);
      const [age,setAge]= useState(user?.age)
      const [gender,setGender]= useState(user?.gender)
      const [photoUrl,setPhotoUrl]=useState(user?.photoUrl)
      const [about,setAbout]=useState(user?.about)
      const [toast,setToast]=useState(false);
      const dispatch =useDispatch()
    //   const[skills,setSkills]=useState(user?.skills)
      const [ error,setError]=useState('')

      
const handleSaveProfile = async()=>{
    setError('')
    try {
              const res= await axios.post(
        url+'/profile/edit',
        {
         firstName,
         lastName,
         age,
         gender,
         photoUrl,
         about
        }
        ,{
            withCredentials:true
        }
        )
      dispatch(addUser(res.data.data));
      setToast(true)
      setTimeout(()=>{
        setToast(false)
      },3000)
        
    } catch (error) {
        setError(error.response.data)
    }

 }


 return (
   <>
    <div className='flex  justify-center m-4  gap-4'>    
      <div className=" flex items-center justify-center mx-5 bg-base-200">
        <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
            <h2 className="card-title justify-center">
            {'Edit Your Profile'}
            </h2>
            <InputField label="First Name" type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value);setError('');}} placeholder="Enter Your First Name" />
            <InputField label="Last Name" type="text" value={lastName} onChange={(e) => {setLastName(e.target.value);setError('');}} placeholder="Enter Your Last Name "/>
            <InputField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
            <InputField label="Gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="male/female/other" />
            <InputField label="PhotoUrl" type="Url" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} placeholder="PhotoUrl"/>
            <InputField label="About" type="textarea" value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="Write about yourself"/>
            
            {/* <InputField label="Skills" type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Your skills..."/> */}
            <p className="text-red-500 text-center">{error}</p>

            <div className="card-actions justify-center items-center">
                <button
                className="btn btn-primary"
                  onClick={handleSaveProfile}
                >
                {'Save Profile'}
                </button>
            </div>
            
            </div>
          </div>
      </div>
        
        <UserCard user={{firstName,lastName,about,age,photoUrl,gender}}/>
    </div>
    {toast &&
        <div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
        </div>
        </div>
    }

    </>
  )
}

export default EditProfile
