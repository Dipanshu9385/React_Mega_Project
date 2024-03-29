import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Logo } from './container';
import { useDispatch } from 'react-redux';
import { authService } from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const { register, handleform } = useForm()

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block max-w-[100px] w-full'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {
                    error && <p className='text-center mt-8 text-red-600'>{error}</p>
                }

                <form onSubmit={handleform(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email :"
                            placeholder="Enter your placeholder"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.text(value) || "Email addredd must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.text(value) || "Enter a storng password"
                                }
                            })}
                        />
                        <Button
                            className='w-full'
                            type="submit"
                        >
                            Login
                        </Button>


                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
