import { getProducts } from '../helpers/getProducts';
import ProductCard from '../components/ProductCard';
import CategoryTitle from '../components/CategoryTitle';
import { getCurrentUser } from '../helpers/getCurrentUser';

export default async function ListaDeProductosPage () {
    const products = await getProducts();
    const currentUser = await getCurrentUser();

    const burguers = products.filter((product) => product.category === 'Burguers');
    const fritos = products.filter((product) => product.category === 'Fritos');
    const bebidas = products.filter((product) => product.category === 'Bebidas');

    return (
    <div className='flex flex-col items-center justify-start px-20'>
        {
            currentUser ? (
            <>
            <h2 className='my-3 font-bold text-2xl text-red-500'>Lista de productos</h2>
            <CategoryTitle title='Burguers' />
            <div
                className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            >
                {
                    burguers.map((product) => (
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
                    fritos.map((product) => (
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
                    bebidas.map((product) => (
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
        </>
            ) : (
                <h2>No tienes permiso para ver esto</h2>
            )
        }

    </div>
  )
}
