import React, { useState } from 'react'
import { authService } from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Logo, Button, Input } from './container';

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('')

    const oNSubmit = async (data) => {
        setError("")
        try {
            const account = await authService.createAccount(data)
                if (account) {
                    const userData = await authService.getCurrentUser()
                    if (userData) dispatch(authLogin(userData))
                    navigate('/')
                }
            
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Create new Account</h2>
        <form className='mt-8' onSubmit={handleSubmit(oNSubmit)}>
            <div className='space-y-5'>
                <Input
                label="FullName : "
                placeholder="Enter your fullname here "
                {...register("name",{
                    required:true
                })}
                />
                <Input
                label="Email :"
                placeholder="Enter your placeholder"
                type="email"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPatern:(value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.text(value) || "Email addredd must be a valid address" 
                    }
                })}
                />
                <Input
                label="Password :"
                placeholder="Enter your password"
                type="password"
                {...register("password",{
                    required:true,
                    validate:{
                        matchPatern:(value)=> /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.text(value) ||"Enter Correct password"
                    }
                })}
                />
                <Button
                className="w-full"
                type="submit"
                >
                    Create Account
                </Button>
            </div>
        </form>
        <p className='mt-2 text-center text-base text-black/60'>
            already have'n account? &nbsp;
            <Link to="/login" 
            className='font-semibold text-primary transition-all duration-200 hover:underline'
            >
            Sign In
            </Link>
        </p>
        {
            error && <p className='text-red-600 text-center mt-6'>{error}</p>
        }
        </div>
    )
}

export default SignUp
