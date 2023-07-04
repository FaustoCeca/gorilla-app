'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler, set } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';

const AdminLoginModal = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const login = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (login?.ok) {
                setIsLoading(false);
                toast.success('Bienvenido');
                router.refresh();
                loginModal.onClose();
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Error al iniciar sesión');
            router.push('/');            
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Bienvenido' subtitle='Loguate a tu cuenta' />
            <Input 
                label='Email'
                id='email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                label='Contraseña'
                id='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    
  
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Iniciar sesión'
            actionLabel='Continuar'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default AdminLoginModal;