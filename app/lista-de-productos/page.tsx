import React from 'react'
import { getProducts } from '../helpers/getProducts';
import ProductCard from '../components/ProductCard';

export default async function ListaDeProductosPage () {
    const products = await getProducts();


    

    return (
    <div className='text-center flex flex-col items-center justify-center px-20'>
        <h2 className='my-3 font-bold text-2xl text-red-500'>Lista de productos</h2>
        {
            products.map((product) => (
                <ProductCard 
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    availableProp={product.available}
                    category={product.category}
                />
            )
            )
        }
    </div>
  )
}
