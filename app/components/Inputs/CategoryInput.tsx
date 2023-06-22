'use client'

import { IconType } from "react-icons";

interface CategoryInputProps {
    label: string;
    icon: IconType;
    selected: boolean;
    onClick: (value: string) => void;
}

const CategoryInput = ({label, selected, icon: Icon, onClick}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 p-4 rounded-lg border-2 cursor-pointer hover:border-black transition
      ${selected ? 'border-black' : 'border-red-400'}`}
    >
      <Icon size={30} />
      <p className="font-semibold">
        {label}
      </p>
    </div>
  )
}

export default CategoryInput;