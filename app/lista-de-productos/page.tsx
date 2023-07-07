import { getProducts } from '../helpers/getProducts';
import ProductCard from '../components/ProductCard';
import CategoryTitle from '../components/CategoryTitle';
import { getCurrentUser } from '../helpers/getCurrentUser';
import useCart from '../hooks/useCart';

export default async function ListaDeProductosPage () {
    const products = await getProducts();
    const currentUser = await getCurrentUser();
    const cart = useCart();

    return (
    <div className='flex flex-col items-center justify-start px-20'>
        <h2 className='my-3 font-bold text-2xl text-red-500'>Lista de productos</h2>
        <CategoryTitle title='Burguers' />
        <div
            className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
            {
                products.filter((product) => product.category === 'Burguers').map((product) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        availableProp={product.available}
                        category={product.category}
                        showEditButton={
                            currentUser ? true : false
                        }
                    />
                ))
            }
        </div>
        <CategoryTitle title='Fritos' />
        <div
            className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
            {
                products.filter((product) => product.category === 'Fritos').map((product) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        availableProp={product.available}
                        category={product.category}
                        showEditButton={
                            currentUser ? true : false
                        }
                    />
                ))
            }
        </div>
        <CategoryTitle title='Bebidas' />
        <div
            className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
            {
                products.filter((product) => product.category === 'Bebidas').map((product) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        availableProp={product.available}
                        category={product.category}
                        showEditButton={
                            currentUser ? true : false
                        }
                    />
                ))
            }
        </div>
    </div>
  )
}
