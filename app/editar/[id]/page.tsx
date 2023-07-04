import UpdateForm from "@/app/components/UpdateForm";
import getProdById from "@/app/helpers/getProdById";

interface IParams {
    id: string;
}

const EditPage = async ({ params }: { params:IParams }) => {
    const product = await getProdById(params);

    return (
        <div className="p-10 mx-10 mt-10 border-gray-800 border-[1px]">
            {product?.name}
            <UpdateForm
                id={product?.id}
                name={product?.name}
                description={product?.description}
                image={product?.image}
                price={product?.price}
                available={product?.available}
                categoryProp={product?.category}
            />
        </div>
        )
}

export default EditPage;