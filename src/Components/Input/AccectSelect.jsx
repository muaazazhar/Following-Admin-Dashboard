import React, { useState } from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Divider from "@mui/material/Divider";
import decline_icon from "../../assets/decline_icon.png";
import accept_icon from "../../assets/accept_icon.png";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import chroma from 'chroma-js';

const DropdownIndicator = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDropDownSharpIcon sx={{ color: "#000000" }} />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = (
  props
) => {
  return (
    <></>
  );
};





export default function AccectSelect({ id = "1", name = "1", row ={id:"row"}, options, defaultValue = {}, onChange, placeholder = "" }) {
  
  const [selected, setSelected] = useState(defaultValue);

  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      <img src={selected.value?accept_icon:decline_icon} style={{width: "20px" , height:"20px", borderRadius: "20px", marginLeft: "10px"}} /> {children}
    </components.Control>
  );

  
  const colourStyles = {
    control: (styles) => ({ ...styles,
        width: "100%",
        borderRadius: "100px",
        color: selected?.color,
        backgroundColor: selected?.bcolor,
      borderColor: "transparent",
      boxShadow: "none",
      ':hover': {
        ...styles[':active'],
        borderColor: "transparent",
      boxShadow: "none",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    placeholder: (styles) => ({ ...styles,  }),
    singleValue: (styles, { data }) => ({ ...styles,color: selected?.color }),
  };

  return(
    <Select
      menuPortalTarget={document.body} menuPosition={'fixed'}
      placeholder={placeholder}
      isSearchable={false}
      required={true}
      id={id}
      defaultValue={defaultValue}
      name={name}
      onChange={(e) => {
        setSelected(e);
        onChange(e, row);
      }}
    closeMenuOnSelect={true}
    components={{ DropdownIndicator,IndicatorSeparator, Control }}
    options={options}
    styles={colourStyles}
  
    />
  )
}
