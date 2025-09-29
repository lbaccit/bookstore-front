"use client";

import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

const Modal =  ({ isOpen, onClose, children, title, size = 'md' }: ModalProps) => {
    if (!isOpen) return null;
    
    const getSizeClass = () => {
        const sizeClasses = {
            'sm': 'max-w-sm',
            'md': 'max-w-md', 
            'lg': 'max-w-lg',
            'xl': 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl'
        };
        return sizeClasses[size];
    };
    
    return (
        <div 
        className="fixed inset-0 z-50 flex justify-center items-center p-4"
        style= {{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
        >
            <div 
                className={`bg-white p-6 rounded-lg shadow-xl w-full ${getSizeClass()} max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;