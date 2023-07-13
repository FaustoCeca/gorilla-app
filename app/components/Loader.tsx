
const Loader  = ({size = 20}: { size?: number }) => {
  return (
    <div style={{ width: size, height: size }} className="spinner">   
    </div>
  )
}

export default Loader;