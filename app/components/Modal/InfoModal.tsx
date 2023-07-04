'use client'

import useInfoModal from "@/app/hooks/useInfoModal";
import Modal from "./Modal";

interface InfoModalProps {
    schedule: string | undefined;
    address: string | undefined;
    phone: string | undefined;
}

const InfoModal = ({ schedule, address, phone }: InfoModalProps) => {
    const infoModal = useInfoModal();

    const body = (
        <div className="flex flex-col gap-3 justify-center items-center">
            <p
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <strong>Dirección:</strong> {address}
            </p>
            <p
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <strong>Teléfono:</strong> {phone}
            </p>
            <p
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <strong>Horarios:</strong> {schedule}
            </p>
        </div>
    )

    return (
        <Modal 
            title="Información"
            isOpen={infoModal.isOpen}
            onClose={infoModal.onClose}
            body={body}
        />
    )
}

export default InfoModal;