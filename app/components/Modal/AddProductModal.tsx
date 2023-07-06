import useCart from "@/app/hooks/useCart";
import Modal from "./Modal";
import useAddProductModal from "@/app/hooks/useAddProductModal";

interface AddProductModalProps {
    title: string;
    description: string;
    image: string;
    price: number;
}

const AddProductModal = ({ title, description, image, price }: AddProductModalProps) => {
  const cart = useCart();
  const addProdModal = useAddProductModal();


  const body = (
    <div>
        Producto
    </div>
  );
  
    return (
        <Modal
            title={title}
            isOpen={addProdModal.isOpen}
            onClose={addProdModal.onClose}
            body={body}
        />
    )
}

export default AddProductModal;