
interface AvailableInputProps {
    available: boolean;
    onClick: (value: any) => void;
}

const AvailableInput = ({ available, onClick }: AvailableInputProps) => {
    
  return (
    <input 
        type="checkbox" 
        defaultChecked={available} 
        onClick={onClick} 
        className="w-5 h-5 cursor-pointer"
    />
    )
}

export default AvailableInput;