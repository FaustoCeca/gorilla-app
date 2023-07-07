'use client'

import useOrderModal from "@/app/hooks/useOrderModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import useCart from "@/app/hooks/useCart";

enum Steps {
    Delivery = 1,
    Info = 2,
    Payment = 3,
}

const OrderModal = () => {
    const { onClose, isOpen } = useOrderModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(Steps.Delivery);
    const { cart, clearCart } = useCart();

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            client: '',
            address: '',
            phone: '',
            paymentMethod: '',
            deliveryMethod: '',
            status: 'pending',
            schedule: '',
            clarifications: '',
            products: [],
            total: 0,
        }
    });

    const deliveryMethod = watch('deliveryMethod');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const HandleBack = () => {
        setStep((step) => step - 1);
    }

    const HandleNext = () => {
        setStep((step) => step + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== Steps.Payment) {
            HandleNext();
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/api/orders', data);

            onClose();
            toast.success('Pedido realizado con éxito');
        } catch (error: any) {
            toast.error('Error al realizar el pedido, intentalo de nuevo');            
        }
    }

    const actionLabel = useMemo(() => {
        if (step === Steps.Payment) {
            return 'Realizar pedido';
        }

        return 'Siguiente';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === Steps.Delivery) {
            return 'Cancelar';
        }

        return 'Anterior';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Dejanos tus datos para realizar el pedido" subtitle="Asegurate de que sean correctos" />
            <div className="flex flex-col gap-4">
                <Input
                    label="Tu nombre y apellido"
                    id="client"
                    register={register}
                    required
                    errors={errors}
                />
                <Input
                    label="Tu teléfono"
                    id="phone"
                    register={register}
                    required
                    errors={errors}
                />
                <select
                    className="border border-gray-300 rounded-md p-2"
                    {...register('deliveryMethod', { required: true })}
                >
                    <option value="">
                        Selecciona un método de entrega
                    </option>
                    <option value="delivery">
                        Delivery
                    </option>
                    <option value="takeaway">
                        Retiro en local
                    </option>
                </select>
                {
                    deliveryMethod === 'delivery' && (
                        <Input
                            label="Tu dirección"
                            id="address"
                            register={register}
                            required
                            errors={errors}
                        />
                )}
            </div>
        </div>
    )

    

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            body={bodyContent}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryAction={step !== Steps.Delivery ? HandleBack : onClose}
            secondaryActionLabel={secondaryActionLabel}
            title="Realizar pedido"
            disabled={isLoading}
        />
  )
}

export default OrderModal;