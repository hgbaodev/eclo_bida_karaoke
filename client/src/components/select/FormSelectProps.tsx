import React from 'react';
import { Controller } from 'react-hook-form';
import { Select } from 'rizzui';

interface FormSelectProps {
  name: string;
  control: any; // Pass the control prop from useForm()
  options: any[]; // Define a type/interface for your options
  label: string;
  placeholder?: string;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ name, control, options, label, placeholder, error }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, onChange, value } }) => (
        <Select
          options={options}
          value={value}
          onChange={onChange}
          name={name}
          label={label}
          className="col-span-[1/2]"
          placeholder={placeholder}
          error={error}
          getOptionValue={(option) => option.active}
          getOptionDisplayValue={(option) => option.name}
          displayValue={(selected: string) => options.find((option) => option.active === selected)?.name ?? selected}
          dropdownClassName="!z-[1]"
          inPortal={false}
        />
      )}
    />
  );
};

export default FormSelect;
