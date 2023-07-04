'use client'

import useBranchModal from "@/app/hooks/useBranchModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Modal from "./Modal";

const BranchModal = () => {
    const branchModal = useBranchModal();
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            phone: '',
            address: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.post('/api/branchs', data);

            branchModal.onClose();
            setIsLoading(false);


            toast.success("Sucursal creada correctamente");
        } catch (error: any) {
            toast.error('Algo salió mal!');
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Crear nueva sucursal" />
            <Input 
                id='name'
                label='Nombre'
                disabled={isLoading}
                register={register}
                required
                errors={errors}
            />
            <Input
                id="phone"
                label="Telefono"
                disabled={isLoading}
                register={register}
                required
                errors={errors}
                type="number"
            />
            <Input
                id="address"
                label="Direccion"
                disabled={isLoading}
                register={register}
                required
                errors={errors}
            />
            <Input
                id="schedule"
                label="Horario"
                disabled={isLoading}
                register={register}
                required
                errors={errors}
            />
        </div>
    )

  
    return (
        <Modal 
            title="Crear nueva sucursal"
            isOpen={branchModal.isOpen}
            onClose={branchModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Crear"
            body={bodyContent}
        />
        )
}

export default BranchModal;