import React, { useState } from 'react';

interface ModalProps {
    isOpen: React.SetStateAction<boolean>;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50 cursor-pointer" onClick={onClose}></div>
                    <div className="bg-white rounded-lg p-6 z-10">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;