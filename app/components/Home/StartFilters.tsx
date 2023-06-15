
const StartFilters = () => {
    return (
    <div className="bg-[url('../public/images/bg-hom.jpg')] relative h-72 w-full" >
      <div className='flex flex-col items-center justify-center py-4'>
        <h2 className='font-bold text-red-800'>
            GORILLA BURGUER
        </h2>
        <div className='flex flex-col mt-6 items-center w-[80%] md:w-[30%] bg-gray-500 rounded-lg py-5 px-4'>
          <h3 className='font-bold text-white'>
            Ingresa tu direccion
          </h3>
          <input className='w-full mt-3' type="text" placeholder='Calle y numero' />
          <button
            className='bg-red-800 text-white rounded-lg py-2 px-4 mt-3'
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartFilters;