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
import ItemsCart from "../Cart/ItemsCart";
import { CartItems } from "@/app/types";
import MercadoPagoButton from "../Buttons/MercadoPagoButton";
import { useRouter } from "next/navigation";

enum Steps {
    Delivery = 1,
    Info = 2,
    Payment = 3,
    // Thanks = 4,
}

interface OrderModalProps {
    branchName: string | undefined;
}

const OrderModal = ({ branchName }: OrderModalProps) => {
    const { onClose, isOpen } = useOrderModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(Steps.Delivery);
    const { cart } = useCart();
    const totalFn = cart.reduce((acc: number, item: CartItems) => acc + item.price, 0);
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            client: '',
            address: '',
            phone: '',
            paymentMethod: '',
            deliveryMethod: '',
            status: 'Pendiente',
            clarifications: '',
            branch: branchName,
            products: [],
            total: '',
            cash: '',
        }
    });

    const deliveryMethod = watch('deliveryMethod');

    const setProductsWithCartValues = () => {
        const productsWithCartValues = cart.map((item: CartItems) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: calcQuantity(item.id),
        }));

        setCustomValue('products', productsWithCartValues);
        setCustomValue('total', totalFn);
    }

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const calcQuantity = (id: string): number => {
        let quantity = 0;
        
        cart.forEach((item: CartItems) => {
          if (item.id === id) {
            quantity += 1;
          }
        });
    
        return quantity;
    }

    // const mercadoPagoPayment = async () => {
    //     const response = await axios.post('/api/mercadopago', {
    //         products: cart,
    //     });
    // }

    const HandleBack = () => {
        setStep((step) => step - 1);
    }

    const HandleNext = () => {
        setStep((step) => step + 1);

        if (step === Steps.Info) {
            setProductsWithCartValues();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== Steps.Payment) {
            HandleNext();
            return;
        }

        const numberCash = Number(watch('cash'));

        if (numberCash < totalFn) {
            toast.error('El monto ingresado es menor al total');
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await axios.post('/api/orders', data);

            onClose();
            toast.success('Pedido realizado con éxito');
            router.push('/');
            reset();
            setStep(Steps.Delivery);
            setIsLoading(false);
        } catch (error: any) {
            toast.error('Error al realizar el pedido, intentalo de nuevo'); 
            console.log(error);
            onClose();
            reset();
            setStep(Steps.Delivery);
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
                    type="number"
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

    if (step === Steps.Info) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="¿Algo más que nos quieras decir?" subtitle="Asegurate de que sean correctos" />
                <div className="flex flex-col gap-4">
                    {
                        cart.map((item: CartItems, index: number) => (
                            <ItemsCart
                                key={index}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={calcQuantity(item.id)}
                            />
                        )
                    )}
                    <hr />
                    <h3
                        className="text-2xl font-bold"
                    >
                        Total: ${totalFn}
                    </h3>
                    <label 
                        htmlFor="clarifications"
                        className="text-lg font-semibold"
                    >
                        Aclaraciones
                    </label>
                    <textarea 
                        id="carifications" 
                        className="border border-gray-300 rounded-md p-2"
                        {...register('clarifications')}
                    >
                    </textarea>
                </div>
            </div>
        )
    }

    if (step === Steps.Payment) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="¿Cómo vas a pagar?" subtitle="Selecciona un metodo de pago" />
                <div className="flex flex-col gap-4">
                    <select
                        className="border border-gray-300 rounded-md p-2"
                        {...register('paymentMethod', { required: true })}
                    >
                        <option value="">
                            Selecciona un método de pago
                        </option>
                        <option value="cash">
                            Efectivo
                        </option>
                        <option value="online">
                            Online
                        </option>
                    </select>
                    {
                        watch('paymentMethod') === 'cash' && (
                            <Input
                                label="¿Con cuanto vas a pagar?"
                                id="cash"
                                register={register}
                                required
                                errors={errors}
                                formatPrice
                                type="number"
                            />


                        )
                    }
                    {/* {
                        watch('paymentMethod') === 'online' && (
                            <MercadoPagoButton
                                products={cart}
                            />
                        )
                    } */}
                </div>
            </div>
        )
    }

    // if (step === Steps.Thanks) {
    //     bodyContent = (
    //         <div className="flex flex-col gap-8">
    //             <Heading title="¡Gracias por tu pedido!" subtitle="En breve nos pondremos en contacto contigo" />
    //             <div className="flex flex-col gap-4">
    //                 <div className="flex flex-col gap-4">
    //                     <h3 className="text-2xl font-bold">Tu pedido</h3>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

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