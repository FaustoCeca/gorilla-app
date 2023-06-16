import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: string;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal = ({ 
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
 }: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
      setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback( () => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

  return (
    <div>

    </div>
  )
}

export default Modal;