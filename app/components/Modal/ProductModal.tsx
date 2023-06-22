'use client'

import useProductModal from "@/app/hooks/useProductModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { categories } from "@/app/info/categories";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import Modal from "./Modal";
import Input from "../Inputs/Input";
import ImageUpload from "../Inputs/ImageUpload";

enum Steps {
    Category = 1,
    Info = 2,
    Images = 3,
    Price = 4,
}

const ProductModal = () => {
  const productModal = useProductModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(Steps.Category);
  const router = useRouter();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '' as string,
      title: '',
      description: '',
      imageSrc: '',
      price: 1,
    }
  });

  const category = watch('category');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
    });
  }

  const handleBack = () => {
    setStep((step) => step - 1);
  }

    const handleNext = () => {
        setStep((step) => step + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== Steps.Price) {
            handleNext();
            return
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/api/products', data);

            productModal.onClose();
            toast.success("Producto creado correctamente");
            router.refresh();
            reset();
            setStep(Steps.Category);
        } catch (error: any) {
            toast.error('Algo salió mal!');
        }

        setIsLoading(false);
    }

    const actionLabel = useMemo(() => {
        if (step === Steps.Price) {
            return 'Crear producto';
        }

        return 'Siguiente';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === Steps.Category) {
            return 'Cancelar';
        }

        return 'Anterior';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Elegi una categoria para el nuevo producto!" subtitle="Se puede cambiar despues" />
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                <div className="col-span-1" key={item.label}>
                    <CategoryInput 
                    onClick={(category) => setCustomValue('category', category)}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label}
                    />
                </div>
                ))}
            </div>
        </div>
    )

    if (step === Steps.Info) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Informacion del producto" subtitle="Completa los campos para crear el producto" />
                <Input
                    id="name"
                    label="Nombre del producto"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Descripcion del producto"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === Steps.Images) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Imagenes del producto" subtitle="Agrega imagenes para el producto" />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)} 
                />
            </div>
        )
    }

    if (step === Steps.Price) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Precio del producto" subtitle="Agrega el precio del producto, puede cambiarse despues" />
                <Input 
                    id="price"
                    label="Precio del producto"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    type="number"
                    formatPrice
                />
            </div>
        )
    }


    return (
        <Modal
            actionLabel={actionLabel}
            isOpen={productModal.isOpen}
            onClose={productModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            secondaryAction={ step !== Steps.Category ? handleBack : productModal.onClose}
            secondaryActionLabel={secondaryActionLabel}
            title="Crear nuevo producto"
            body={bodyContent}
            disabled={isLoading}
        />
        )
}

export default ProductModal;