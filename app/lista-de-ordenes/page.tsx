import OrderBody from '../components/OrderBody';
import { getCurrentUser } from '../helpers/getCurrentUser';
import { getOrders } from '../helpers/getOrders';

export default async function ListaDeOrdenesPage () {
    const orders = await getOrders();
    const currentUser = await getCurrentUser();

  return (
        <div className='px-32'>
            {
                currentUser ? (
                    <>
                        <h2 className='my-3 font-bold text-2xl text-red-500'>Lista de ordenes</h2>
                        <hr />
                        <h3 className='my-3 text-xl text-red-500 items-start'>
                            Sucursal Funes
                        </h3>
                        <table className='w-full text-left'>
                            <thead>
                                <tr>
                                    <th>
                                        Orden
                                    </th>
                                    <th>
                                        Cliente
                                    </th>
                                    <th>
                                        Telefono
                                    </th>
                                    <th>
                                        Takeaway
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                    <th>
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.filter((order) => order.branch === 'Sucursal Funes').map((order) => (
                                        <OrderBody 
                                            key={order.id}
                                            id={order.id}
                                            created={order.createdAt}
                                            status={order.status}
                                            total={order.total}
                                            client={order.client}
                                            address={order.address}
                                            phone={order.phone}
                                            paymentMethod={order.paymentMethod}
                                            deliveryMethod={order.deliveryMethod}
                                            products={order.products}
                                            clarifications={order.clarifications}
                                            branch={order.branch}
                                            cashAmount={order.cashAmount}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                ) : <h2 className='mt-4 font-bold text-2xl text-red-500'>No tienes permiso para ver esto, contactate con un administrador o logueate</h2>
            }
            {
                currentUser ? (
                    <>
                    <hr />
                    <h3 className='my-3 text-xl text-red-500 items-start'>
                        Sucursal Rosario
                    </h3>
                    <table className='w-full text-left'>
                        <thead>
                            <tr>
                                <th>
                                    Orden
                                </th>
                                <th>
                                    Cliente
                                </th>
                                <th>
                                    Telefono
                                </th>
                                <th>
                                    Takeaway
                                </th>
                                <th>
                                    Total
                                </th>
                                <th>
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.filter((order) => order.branch === 'Sucursal Rosario').map((order) => (
                                    <OrderBody 
                                        key={order.id}
                                        id={order.id}
                                        created={order.createdAt}
                                        status={order.status}
                                        total={order.total}
                                        client={order.client}
                                        address={order.address}
                                        phone={order.phone}
                                        paymentMethod={order.paymentMethod}
                                        deliveryMethod={order.deliveryMethod}
                                        products={order.products}
                                        clarifications={order.clarifications}
                                        branch={order.branch}
                                        cashAmount={order.cashAmount}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </>
                ) :  <h2 className='mt-4 font-bold text-2xl text-red-500'>No tienes permiso para ver esto, contactate con un administrador o logueate</h2> 
            }
        </div>
  )
}
