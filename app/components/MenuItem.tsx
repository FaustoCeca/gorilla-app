'use client';

interface MenuItemProps {
    onClick: () => void;
    label: string
}

const MenuItem = ({onClick, label}: MenuItemProps) => {
  return (
    <div
     onClick={onClick}
     className="px-3 py-3 hover:bg-neutral-100 transition font-semibold"
    >
        <p>
            {label}
        </p>
    </div>
  )
}

export default MenuItem;