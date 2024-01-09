import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

const LogoutBtn = () => {
    const dispatch=useDispatch()

    const logouthandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        }).catch((error) => {throw error})
    }
  return (
    <div>
      <Button class="px-4 bg-orange-400 hover:bg-orange-600" onClick={logouthandler}>logoutBtn</Button>
    </div>
  )
}

export default LogoutBtn;
