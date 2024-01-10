import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({
    children,
    authentication=true
}) => {
    const[loader,setLoader]=useState(true)
    const navigate=useNavigate()
    const authStatus=useSelector((state)=> state.auth.status)

    useEffect(()=>{
        // if (authStatus === true) {   //easy way
        //     navigate('/')
        // } else if(authStatus === false){
        //     navigate('/login')
        // }

        // Industary way
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        }   
        setLoader(false)                    
    },[authStatus,navigate,authentication])
  return loader ? <h2>Loading ...</h2>:<>{children}</>
  
}

export default Protected
