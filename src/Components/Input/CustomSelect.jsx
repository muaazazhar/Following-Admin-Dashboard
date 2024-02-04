import React, { useState, useEffect } from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { FormControl } from '@mui/material';

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <ExpandMoreIcon sx={{ color: '#CCCCCC' }} />
        </components.DropdownIndicator>
    );
};

const IndicatorSeparator = (props) => {
    return (
        <components.IndicatorSeparator {...props}>
            <Divider sx={{ color: '#CCCCCC' }} />
        </components.IndicatorSeparator>
    );
};

export default function CustomSelect({
    id = '1',
    name = '1',
    options,
    defaultValue = null,
    value, // Pass value as a prop
    onChange,
    placeholder = '',
    multi = false,
    disabled = false,
}) {
    const [selectedValue, setSelectedValue] = useState(value); // Use local state

    useEffect(() => {
        setSelectedValue(value); // Update local state when value prop changes
    }, [value]);

    return (
        <FormControl fullWidth>
            <Select
                placeholder={placeholder}
                required={true}
                id={id}
                isMulti={multi}
                name={name}
                isDisabled={disabled}
                defaultValue={defaultValue}
                value={selectedValue} // Use local state for value
                onChange={(e) => {
                    setSelectedValue(e);
                    console.log(e);
                    onChange(e, name);
                }}
                closeMenuOnSelect={true}
                components={{ DropdownIndicator, IndicatorSeparator }}
                options={options}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        marginTop: '10px',
                        width: '100%',
                        color: 'red',
                        borderColor: state.isFocused ? '#E9EDF4' : '#E9EDF4',
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                        ...theme.colors,
                        primary25: '#6C5FFC',
                        primary: '#495057',
                    },
                })}
            />
        </FormControl>
    );
}
