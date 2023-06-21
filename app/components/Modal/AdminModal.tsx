'use client';

import axios from "axios";
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Modal from "./Modal";
import Input from "../Inputs/Input";
import useRegisterModal from "@/app/hooks/useRegisterModal";


const AdminModalRegister = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.post('/api/register', data);
            
            registerModal.onClose();
            setIsLoading(false);

            console.log(response);

            toast.success("Successfully registered!");
        }
        catch (error) {
            toast.error('Something went wrong!');
            setIsLoading(false);
            console.log(error);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Inicio de sesion para admins" />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                required
                errors={errors}
            />
            <Input
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                required
                errors={errors}
            />
        </div>
    )

  return (
    <Modal 
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        disabled={isLoading}
        title="Inicio de sesion para admins"
        actionLabel="Iniciar sesion"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
    />
    )
}

export default AdminModalRegister;