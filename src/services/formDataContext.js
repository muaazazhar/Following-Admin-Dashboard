import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState({});

    const updateFormData = (newFormData) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...newFormData,
        }));
    };

    return (
        <FormDataContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error('useFormData must be used within a FormDataProvider');
    }
    return context;
};
