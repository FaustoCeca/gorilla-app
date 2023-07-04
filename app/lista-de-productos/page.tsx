import { getProducts } from '../helpers/getProducts';
import ProductCard from '../components/ProductCard';
import CategoryTitle from '../components/CategoryTitle';
import { getCurrentUser } from '../helpers/getCurrentUser';

export default async function ListaDeProductosPage () {
    const products = await getProducts();
    const currentUser = await getCurrentUser();

    console.log(currentUser);

    return (
    <div className='flex flex-col items-center justify-center px-20'>
        <h2 className='my-3 font-bold text-2xl text-red-500'>Lista de productos</h2>
        <CategoryTitle title='Burguers' />
        <hr />
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
                    showEditButton={true}
                />
            )
            )
        }
        <CategoryTitle title='Fritos' />
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
                    showEditButton={true}
                />
            )
            )
        }
        <CategoryTitle title='Bebidas' />
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
                    showEditButton={true}
                />
            )
            )
        }
    </div>
  )
}
