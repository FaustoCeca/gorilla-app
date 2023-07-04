'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "./Inputs/Input";
import { categories } from '../info/categories';
import CategoryInput from "./Inputs/CategoryInput";
import Image from "next/image";
import ImageUpload from "./Inputs/ImageUpload";

interface UpdateFormProps {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    image: string | undefined;
    price: number | undefined;
    available: boolean | undefined;
    categoryProp: string | undefined;
}

const UpdateForm = ({ id, name, description, available, image, price, categoryProp }: UpdateFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            name: name,
            description: description,
            image: image,
            price: price,
            available: available,
            category: categoryProp,
            id: id,
        }
    });

    const category = watch('category');
    const imageSrc = watch('image');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.put(`/api/products/${id}`, data);

            toast.success('Producto actualizado correctamente');
            router.push('/lista-de-productos');
            reset();
        } catch (error: any) {
            toast.error('Algo salió mal!');
        }
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-4">
                <Input 
                    id="name"
                    label={`Actual: ${name}`}
                    disabled={isLoading}
                    register={register}
                    required
                    errors={errors}
                />
                <Input 
                    id="description"
                    label="Descripción"
                    disabled={isLoading}
                    register={register}
                    required
                    errors={errors}
                />
                <Input 
                    id="price"
                    label={`Actual: ${price}`}
                    disabled={isLoading}
                    register={register}
                    required
                    errors={errors}
                    formatPrice
                />

                <div className="flex mt-3 flex-col gap-5 text-center md:text-left">
                    <h2>
                        Categoria actual: {categoryProp}
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
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
                    <div className="flex flex-col gap-4 mt-3">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <h2>
                                Imagen actual:
                            </h2>
                            <Image 
                                src={image ? image : '/images/placeholder.png'}
                                alt={name ? name : 'Imagen de producto'}
                                width={200}
                                height={200}
                                style={{ objectFit: 'cover' }}

                            />
                        </div>
                        <ImageUpload 
                            value={imageSrc}
                            onChange={(image) => setCustomValue('image', image)}
                        />
                    </div>
                    <div 
                        className="flex flex-col gap-4 mt-3"
                    >
                        <h2>
                            Disponibilidad actual: {available ? 'Disponible' : 'No disponible'}
                        </h2>
                        <select
                            className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            {...register('available')}
                        >
                            <option value="true">Disponible</option>
                            <option value="false">No disponible</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Actualizar
                    </button>
                </div>
            </div>
        </form>
  )
}

export default UpdateForm;