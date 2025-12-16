import React from "react";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      displayType={'input'}
      thousandSeparator={true}
      prefix={'$'}
      decimalScale={2}
    />
  );
});

export default function CurrencyInput({name, label, id}) {
    const [numberformat, setNumberformat] = React.useState(0);
  
    const handleChange = (event) => {
      setNumberformat(event.target.value);
    };
  
    return (
        <TextField
          label={label}
          value={numberformat}
          onChange={handleChange}
          name={name}
          id={id}
          slotProps={{
            input: {
              inputComponent: NumberFormatCustom,
            },
          }}
          variant="standard"
        />
    );
}