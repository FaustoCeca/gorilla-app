
interface CategoryTitleProps {
    title: string;
}

const CategoryTitle = ({ title }: CategoryTitleProps) => {
  return (
    <h3 className='font-bold text-red-400 self-start my-4'>
        {title} 
    </h3>
    )
}

export default CategoryTitle;