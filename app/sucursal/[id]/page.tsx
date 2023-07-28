import BranchInfo from "@/app/components/BranchInfo";
import OrderCart from "@/app/components/Cart/OrderCart";
import CategoryTitle from "@/app/components/CategoryTitle";
import InfoModal from "@/app/components/Modal/InfoModal";
import OrderModal from "@/app/components/Modal/OrderModal";
import ProductCard from "@/app/components/ProductCard";
import getBranchById from "@/app/helpers/getBranchById";
import { getCurrentUser } from "@/app/helpers/getCurrentUser";
import { getProducts } from "@/app/helpers/getProducts";

interface IParams {
  id: string;
}

const BranchPage = async ({ params }: { params:IParams}) => {

  const branch = await getBranchById(params);
  const products = await getProducts();
  const currentUser = await getCurrentUser();

  const availableProducts = products.filter((product) => product.available === true);

  const burguers = availableProducts.filter((product) => product.category === 'Burguers');
  const fritos = availableProducts.filter((product) => product.category === 'Fritos');
  const bebidas = availableProducts.filter((product) => product.category === 'Bebidas');

  return (
    <>
      <main className="template-columnas px-8 md:px-28 mt-4">
          <section>
            <BranchInfo />
            <CategoryTitle title='Burguers' />
            <div
                className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
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
                        showEditButton={currentUser ? true : false}
                />
                  ))
              }
            </div>
            <CategoryTitle title='Fritos' />
            <div
              className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
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
                        showEditButton={currentUser ? true : false}
                      />
                ))
              }
            </div>
            <CategoryTitle title='Bebidas' />
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
                      showEditButton={currentUser ? true : false}
                    />
                )
                )
            }
          </section>
          <aside>
            <OrderCart />
          </aside>
      </main>
      <InfoModal 
        schedule={branch?.schedule}
        address={branch?.address}
        phone={branch?.phone}
      />
      <OrderModal 
        branchName={branch?.name}
      />
    </>
  )
}

export default BranchPage;