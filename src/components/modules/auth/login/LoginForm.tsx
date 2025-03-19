"use client"

import { Button } from '@/components/ui/button';
import { loginUser } from '@/services/auth';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type LoginFormInputs = {
    email: string;
    password: string;
    confirmPassword: string;
};

const LoginForm = () => {
    const [isMatchedPassword, setIsMatchedPassword] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State to control password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<LoginFormInputs>();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    // Check if password and confirmPassword match
    useEffect(() => {
        if (password === confirmPassword) {
            setIsMatchedPassword(true);
        } else {
            setIsMatchedPassword(false);
        }
    }, [password, confirmPassword]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Logging...")
        try {
            const res = await loginUser(data)
            if (res.success) {
                toast.success(res?.message, { id: toastLoading })
            } else {
                toast.error(res?.message, { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", { id: toastLoading })
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-[#019fc7] mb-6">
                    Login Now
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6 relative">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer"
                        >
                            {passwordVisible ? (
                                <EyeIcon className="text-gray-600" />
                            ) : (
                                <EyeOff className="text-gray-600" />
                            )}
                        </button>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6 relative">
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={confirmPasswordVisible ? 'text' : 'password'} // Toggle confirm password visibility
                            placeholder="Confirm your password"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-[#019fc7] focus:outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer"
                        >
                            {confirmPasswordVisible ? (
                                <EyeIcon className="text-gray-600" />
                            ) : (
                                <EyeOff className="text-gray-600" />
                            )}
                        </button>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        disabled={!isMatchedPassword}
                        type="submit"
                        className="w-full bg-[#019fc7] text-white font-medium py-2 rounded-lg hover:bg-[#019fc7] focus:outline-none cursor-pointer"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
