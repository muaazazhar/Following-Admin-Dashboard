import React from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

const DropdownIndicator = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ExpandMoreIcon sx={{ color: "#CCCCCC" }} />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = (
  props
) => {
  return (
    <components.IndicatorSeparator {...props}>
      <Divider sx={{ color: "#CCCCCC" }} />
    </components.IndicatorSeparator>
  );
};



export default function CustomSelectLogo({ id = "1", name= "1", options, defaultValue = {}, value, onChange, placeholder= ""}) {
  return(
    <Select
      placeholder={placeholder}
      required={true}
      id={id}
      name={name}
      defaultValue={options[0]}
      onChange={(e) => onChange(e, name)}
    closeMenuOnSelect={true}
    components={{ DropdownIndicator, IndicatorSeparator }}
      options={options}
      getOptionLabel={e => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {e.icon}
          <span style={{ marginLeft: 5 }}>{e.label}</span>
        </div>
      )}
    styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        marginTop: "10px",
        width: "100%",
        color: "red",
        borderColor: state.isFocused ? '#E9EDF4' : '#E9EDF4',
      }),
    }}
    theme={(theme) => ({
      ...theme,
      borderRadius: 4,
      colors: {
        ...theme.colors,
        primary25: "#6C5FFC",
        primary: "#495057"
      }
      
    })}
    />
  )
}
