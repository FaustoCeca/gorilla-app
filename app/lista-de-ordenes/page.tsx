import { getCurrentUser } from '../helpers/getCurrentUser';
import { getOrders } from '../helpers/getOrders';

export default async function ListaDeOrdenesPage () {
    const orders = await getOrders();
    const currentUser = await getCurrentUser();


  return (
        <div className='flex flex-col items-center justify-start px-20'>
            {
                currentUser ? (
                    <>
                        <h2 className='my-3 font-bold text-2xl text-red-500'>Lista de ordenes</h2>

                    </>
                ) : <h2 className='mt-4 font-bold text-2xl text-red-500'>No tienes permiso para ver esto, contactate con un administrador o logueate</h2>
            }
        </div>
  )
}
